import { MeshWallet } from '@meshsdk/core';


function otherKey() {
    // El true es para que imprima la clave privada en vez de la lista de palabras aleatorias en crudo
    // return MeshWallet.brew(true);

    // Esta es una clave pura que generé usando lo de arriba pero no quiero cambiar la wallet cada vez
    return "xprv16pzy7h3x6575z4vhdcq4gshhkt76p6wmwuunafqsuhhpfsl679vrn7nc0e2y9fn3gjw48mhpqudlgtfr2wnhu0yl5jgjx0kx0f4vk58vdjeard3ly6th3c6ltdhwql7k5ss8emxxhurlrrtryagpz407y5t5vv48"
}

// Esta es una lista de palabras en crudo que ya tiene una cuenta con plata asociada (le pusimos plata en una testnet ayer)
const own_words = [
    'audit', 'possible', 'enroll', 'foil',
    'require', 'elegant', 'core', 'luxury',
    'verify', 'pelican', 'absent', 'merry',
    'true', 'print', 'slogan', 'steel',
    'voyage', 'hungry', 'much', 'plug',
    'also', 'afford', 'nerve', 'strong'
]

export function newWallet (proveedor, clave) {
    return new MeshWallet({
        networkId: 0,
        fetcher: proveedor,
        submitter: proveedor,
        key: clave
    });
}

// Esta es una wallet creada usando autenticación con la frase secreta
export function walletFromWords (proveedor) {
    return newWallet(
        proveedor, {type: 'mnemonic', words: own_words}
    );
}

// Esta es otra wallet que usa la clave privada cruda
export function walletFromRootKey (proveedor) {
    return walletFromProvidedRootKey(proveedor, otherKey());
}

export function walletFromProvidedRootKey (proveedor, rootKey) {
    return newWallet(
        proveedor, {type: 'root', bech32: rootKey}
    );
}
