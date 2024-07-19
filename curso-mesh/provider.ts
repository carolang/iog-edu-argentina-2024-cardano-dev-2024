import { BlockfrostProvider } from '@meshsdk/core';

// Esta API_KEY la obtuve de un proveedor, en mi caso Blockfrost, entrando al sitio y creando un proyecto nuevo con el paquete gratuito.
// La dirección es https://blockfrost.io/dashboard
const BLOCKFROST_API_KEY = 'preprodg9Wz5eOsMXxvFOT7enJIGS2gS7aTWUmZ';
export default function nuevoProveedorBlockfrost() {
    return new BlockfrostProvider(BLOCKFROST_API_KEY);
};
