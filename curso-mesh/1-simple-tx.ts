import { Transaction } from '@meshsdk/core';
import { walletFromWords, walletFromRootKey } from './wallets';
import nuevoProveedorBlockfrost from './provider';
import firmarYEnviarTransaccion from './transactions';

const proveedorBlockfrost = nuevoProveedorBlockfrost();

// Comienzo de la clase
// Creamos un par de wallets con distintos métodos de autenticación
const aWallet = walletFromRootKey(proveedorBlockfrost);
const anotherWallet = walletFromWords(proveedorBlockfrost);

// Se puede usar un hash de tu clave pública en vez de tu clave pública para anonimizar las transacciones.
// Acá en el medio usamos este console.log para saber adónde mandar desde ownWallet en nami a otherWallet, por fuera del programa.
// console.log(otherWallet.getChangeAddress());

// Se puede consultar el saldo asincrónicamente
console.log("Balance de mi billetera:", await aWallet.getBalance());
console.log("Balance de la otra billetera:", await anotherWallet.getBalance());

// ID de la transacción de ejemplo que hice. La saqué de la extensión de Chrome de Nami a mano.
const txid = '903863ca43c08c9f8efabc7f6b770db6cb82e83841603c66dd001531b9e94244';

// Queremos hacer una transacción. Sobre esta transacción se pueden hacer operaciones.
// Los parámetros son: receptor (o bien una dirección o un datum con cosas que todavía no vimos), y la cantidad de lovelace como string.
const transaccion = new Transaction({initiator: anotherWallet}).sendLovelace(aWallet.getChangeAddress(),'1000000');

// Esta transacción luego de terminar de hacer todo hay que construirla, firmarla y mandarla
await firmarYEnviarTransaccion(transaccion, anotherWallet, [anotherWallet]);

// Se actualizan los balances:
console.log("Balance de mi billetera:", await aWallet.getBalance());
console.log("Balance de la otra billetera:", await anotherWallet.getBalance());


// Este es el hash que obtuve de la transacción que hice en clase
// const txidDeOtherAOwn = 'd0fcedf44c97cb86bcd6b59f12c21ef193b376cdbaa6f917d2a3f00ea613b668';
