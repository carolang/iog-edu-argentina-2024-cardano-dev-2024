import { MeshTxBuilder, MeshWallet, NativeScript, Transaction, UTxO, resolveNativeScriptAddress, resolveNativeScriptHex, resolvePaymentKeyHash, resolveSlotNo } from "@meshsdk/core";
import nuevoProveedorBlockfrost from "./provider";
import { walletFromProvidedRootKey } from "./wallets";
import { firmarYEnviarTransaccion } from "./transactions";

const proveedorBlockfrost = nuevoProveedorBlockfrost();

// const clavesPrivadas = [
//     MeshWallet.brew(true), MeshWallet.brew(true), MeshWallet.brew(true), MeshWallet.brew(true), MeshWallet.brew(true)
// ];
const clavesPrivadas = [
    'xprv1nzw7lygrzyu5s0qdmccvs6x64lvj6ud84rvle5k6hd6mcxhl8dre768f7t2uxaxhtqaqp6hn4xnu55tcfr8v946evvn5d7eqmzmnzaunw5frmv9lx8uyamfpqzl46t5j05v92yt3tp3y5w6f9e9rzga0nuf5d6dk',
    'xprv1fzv4f94mm2hz4yvtyhd8ut8ndftded0tnjlm8knmhqm4cype89z3j748f63ywer0tnk557qhu7nhzqyw0dtz9g9ry0pyuavh4cynzxy6gqw8qmsqffqw6f5mx82rstgx0nmnavvuwkyw7v7nugljt7c76sl0ts60',
    'xprv14qpup0rc6dt263c89me092njqwufarchwg8c48yayl9jzuemp4weajwd8rlyvy3nlq5jfcead2cxn3f6f3fevfy2z0at5f064xlden4v3gtu0j7pwdxy0u5e4w8xwahmt8zjncwsaar9egddd8q4nmstpqg7uvuh',
    'xprv1uzl92keluceffqqzg2lm73s5t7p5wy5s0x2tjgkltckq5tqfxa97zd7l2ngwvwn44c7g03uspyj6ypn9444jj29vau44ph602sje9qhwvjl8vdg0n9zg2vvx0xgdc5ck46fsjygm9q8wrvpvg078h6xjvu2n8pzz',
    'xprv17qtl4xx8nt4q2dzhg6gc77837ktgpawj63j7v595xzrex48py4tkcxw2ll9w73lvus3n9q965l47zmvwadj9umga8htvuu5552xpfm0kxhlm4varjvzn4ww6rjyf5al4p8f3lp2udezkeajumufcnxag5gsg8du9'
];
// console.log(clavesPrivadas);

const wallets = clavesPrivadas.map(
    (rootKey) => walletFromProvidedRootKey(proveedorBlockfrost, rootKey)
);

// const addresses = wallets.map(
//     (wallet) => wallet.getChangeAddress()
// );
const addresses = [
    'addr_test1qpaar2fenl7x5kc4xlkk3qpuejnqkqshlzharv3wgpr8me78gqcguncxuc938qw74mgm7jpnl764rv9264nzfjx380kqttg4tc',
    'addr_test1qrwp6qprlum8shee80xqjtcqfywmezztcjpgj3hvrdqhrxwvqj52fs6ykpuw7f4e0x3fpq3k6xf02wuu0hmrcuncrfkqv043fl',
    'addr_test1qqzevcps7z5054hc8qcgwls7mdagkp0lve7xwragt0exd8dlwxn46lj69u2krr778k588hqgeujp9qg57vxmqldhhqqsdqm04p',
    'addr_test1qq7xw57xrxkgc6jwee5s8c5rjdv4av62y56evs09gvan8hm6mhs5efnnq0mvjcshkzlzyy9jgte20rnxheq67xc5cwts6pzf9s',
    'addr_test1qp45v7yynpczhgag72gj7q8kjf98hdmyg3z5mjmschzxt9tz8k08fc9tzvly0s3lm7hx6ds70kvekgaslp7f3v8mhveqnhedlz'
];
// console.log(addresses);

// Porque tiene que ser alguna
const idxEmisor = 1;
const walletEmisora = wallets[idxEmisor];
const addrWalletEmisora = addresses[idxEmisor];

// Un slot en el futuro cercano
const slotForRedemption = resolveSlotNo('preprod', Date.now() + 1200);

function vestingScriptFrom(slot: string) {
    const afterScript: NativeScript = {
        type: "all",
        scripts: [
            {
                type: "sig",
                keyHash: resolvePaymentKeyHash(addrWalletEmisora)
            },
            {
                type: "after",
                slot: slot
            }
        ]
    };
    return afterScript;
}

const vestingScript = vestingScriptFrom(slotForRedemption);
const scriptAddress = resolveNativeScriptAddress(vestingScript, 0);
console.log("La dirección del script es", scriptAddress);

const receptor = {
    address: scriptAddress,
    datum: {value: "holis", inline: true}
};

const tx = new Transaction({initiator: walletEmisora})
                .sendLovelace(receptor, "909999")
                .setChangeAddress(addrWalletEmisora);

const transaccionCruda = await tx.build();
const transaccionFirmada = await walletEmisora.signTx(transaccionCruda);
// const hashDeTransaccionEnviada = await walletEmisora.submitTx(transaccionFirmada);
const hashDeTransaccionEnviada = "cc15d256d06242be44667b1dcdf8d0e6025f84e1c72b14b71dca19955abbcefd";

console.log("Se envió el script. Hash de la transacción:");
console.log(hashDeTransaccionEnviada);

// Esto es el redeem del 3, no del 4. No anda.
async function redeem() {
    // Ahora quiero hacerle redeem
    const wUTxO: UTxO = (await walletEmisora.getUtxos())[0]; // Debería haber una sola
    const sUTxO: UTxO = (await proveedorBlockfrost.fetchAddressUTxOs(scriptAddress))[0]; // También debería haber una sola

    console.log(wUTxO);
    console.log(sUTxO);

    return "placeholder";

    const redeemTx = new MeshTxBuilder({})
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
        .txInScript(resolveNativeScriptHex(vestingScript))
        // Se encadenan requerimientos de firmas, no son las firmas
        .requiredSignerHash(resolvePaymentKeyHash(addresses[2]))
        .requiredSignerHash(resolvePaymentKeyHash(addresses[3]))
        .requiredSignerHash(resolvePaymentKeyHash(addresses[0]))
        // Le vamos a dar el vuelto a otra billetera distinta
        .changeAddress(addresses[1])
        // No le pusimos outputs, entonces hay que avisarle que tiene que completarla cuando balancee
        // Es sync porque no tiene que buscar en la blockchain inputs para que le dé la plata por ejemplo
        .completeSync();

    // Agregamos las firmas parciales
    const transaccionFirmada = await wallets[0].signTx(
        await wallets[2].signTx(
            await wallets[3].signTx(
                redeemTx.txHex, 
                true), 
            true), 
        true);

    // Enviamos
    const hashDeRedencion = await walletEmisora.submitTx(transaccionFirmada);
    return hashDeRedencion;
}

const hashDeRedencion = await redeem();
// const hashDeRedencion = "74fc937d89b1f55b806cd6c96dd29ad2b1f96a96bb775000ba8376d58324c707";

console.log("Se redimió el contrato. El hash es:")
console.log(hashDeRedencion);