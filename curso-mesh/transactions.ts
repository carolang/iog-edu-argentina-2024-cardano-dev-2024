export async function firmarYEnviarTransaccion(transaccion, walletEmisora, walletsFirmantes) {
    const transaccionFirmada = firmarTransaccion(transaccion, walletsFirmantes);
    const hashDeTransaccionEnviada = await walletEmisora.submitTx(transaccionFirmada);
    return hashDeTransaccionEnviada;
}

export async function firmarTransaccion(transaccion, walletsFirmantes) {
    walletsFirmantes.forEach(
        async (walletFirmante) => {
            // El true es que la firma es parcial, es decir, va a aceptar más de una firma.
            transaccion = await walletFirmante.signTx(transaccion, true);
        }
    );
    return transaccion;
}
