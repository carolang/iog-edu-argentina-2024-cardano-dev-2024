import { walletFromRootKey, walletFromWords } from './wallets';
import nuevoProveedorBlockfrost from './provider';
import { MeshTxBuilder, NativeScript, Transaction, UTxO, resolveNativeScriptAddress, resolveNativeScriptHex, resolvePaymentKeyHash } from '@meshsdk/core';
import { firmarYEnviarTransaccion } from './transactions';

const proveedorBlockfrost = nuevoProveedorBlockfrost();

// Creamos las wallets como en el ejemplo anterior
const walletEmisora = walletFromWords(proveedorBlockfrost);
const walletReceptora = walletFromRootKey(proveedorBlockfrost);

console.log("La billetera emisora", walletEmisora.getChangeAddress() , "tiene:", await walletEmisora.getBalance());
console.log("La billetera receptora", walletReceptora.getChangeAddress(), "tiene:", await walletReceptora.getBalance());

// Obtenemos una dirección para cada una
// const addrWalletEmisora = walletEmisora.getChangeAddress();
const addrWalletEmisora = "addr_test1qq3w9la5fs3mlztfnu9etav6a2gjcd2u2ncl0z3q8pwuvcgmuzya3luhf9rku85awpa34qw0qs7lrtf6c7lr6hxxdnfqknyegz";
// const addrWalletReceptora = walletReceptora.getChangeAddress();
const addrWalletReceptora = "addr_test1qpax84q6mgv2z8m0fqluhmtzfgwxkz709vqmdmh4jnzyl6y3zc29n94t57nng2ea3el3v07llundd4jukwzt94ez56mqhhng58";

// NativeScript de ejemplo. Pide que estén las firmas de las dos wallets
const multiSigScript: NativeScript = {
    type: "all",
    scripts: [
        {
            type: "sig",
            keyHash: resolvePaymentKeyHash(addrWalletEmisora)
        },
        {
            type: "sig",
            keyHash: resolvePaymentKeyHash(addrWalletReceptora)
        }
    ],
};

// Conseguimos la dirección del script. El 0 es la red, es 0 porque es testnet.
const scriptAddress = resolveNativeScriptAddress(multiSigScript, 0);

async function encerrarValorEnScript(valor){
    const receptor = {
        address: scriptAddress,
        datum: {value: valor, inline: true}
    };
    
    // Ahora vamos a crear la transacción con el script para que tenga que tener las dos firmas
    const tx = new Transaction({initiator: walletEmisora}).sendLovelace(receptor, "905100").setChangeAddress(addrWalletEmisora);

    const hashDeTransaccionEnviada = await firmarYEnviarTransaccion(tx, walletEmisora, [walletEmisora]);
    console.log("Se envió el script. Hash de la transacción:");
    console.log(hashDeTransaccionEnviada);
    return hashDeTransaccionEnviada;
}

async function liberarValorDeScript() {
    const wUTxOs: UTxO = (await walletEmisora.getUtxos())[0]; // Debería haber una sola
    // console.log(wUTxOs);
    const sUTxOs: UTxO = (await proveedorBlockfrost.fetchAddressUTxOs(scriptAddress))[0]; // También debería haber una sola
    // console.log(sUTxOs);

    const tx = new MeshTxBuilder({})
        // Esto es plata de la billetera emisora para pagar la fee
        .txIn(
            wUTxOs.input.txHash,
            wUTxOs.input.outputIndex,
            wUTxOs.output.amount,
            addrWalletEmisora
        )
        // Esto es lo que queremos liberar
        .txIn(
            sUTxOs.input.txHash,
            sUTxOs.input.outputIndex,
            sUTxOs.output.amount,
            scriptAddress
        )
        // Hay que proveer el código del script, en formato Cbor, que es una forma de serializar
        // Esto pasa porque no lo inlineamos, sólo mandamos un hash
        .txInScript(resolveNativeScriptHex(multiSigScript))
        // Se encadenan requerimientos de firmas, no son las firmas
        .requiredSignerHash(resolvePaymentKeyHash(addrWalletEmisora))
        .requiredSignerHash(resolvePaymentKeyHash(addrWalletReceptora))
        // Esto es para que el vuelto se le adjudique a la billetera indicada
        .changeAddress(addrWalletEmisora)
        // No le pusimos outputs, entonces hay que avisarle que tiene que completarla cuando balancee
        // Es sync porque no tiene que buscar en la blockchain inputs para que le dé la plata por ejemplo
        .completeSync();

    
    // Agregamos las firmas parciales
    const transaccionFirmadaPor1 = await walletEmisora.signTx(tx.txHex, true);
    const transaccionFirmadaPorAmbos = await walletReceptora.signTx(transaccionFirmadaPor1, true);

    // Enviamos
    const hashDeTransaccionEnviada = await walletEmisora.submitTx(transaccionFirmadaPorAmbos);
    return hashDeTransaccionEnviada;
}

// const txIdDeLaTransaccionQuePudeHacer = await encerrarValorEnScript("holi");
const txIdDeLaTransaccionQuePudeHacer = "3263495095a1a2c9368fa8e52e223b41f26fba54f0f51c996be4653589583483";
console.log("El txid de la transacción que pude hacer es:", txIdDeLaTransaccionQuePudeHacer);

// const txIdDeLaRedencion = await liberarValorDeScript();
const txIdDeLaRedencion = "e188834d0e30f1ab81ab9f6337eddb9f066e324170b25a7b512afe9ee81e4f07";
console.log("El txid de la redención es:", txIdDeLaRedencion);
