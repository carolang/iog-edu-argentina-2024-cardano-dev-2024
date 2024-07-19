<h1 align="center">
  <br>
  <a href="https://www.youtube.com/@iogacademy"><img src="https://ucarecdn.com/288e5001-d93e-4081-976b-0c6f72cc077e/iohksymbolbig.jpg" alt="IOG Academy on YouTube" width="100"></a>
  <br>
  Bienvenido al Cardano Developer Course - ARG - 2024
  <br>
</h1>

El Cardano Developer Course (CDC) es un curso proveído por el equipo de educación
de IOG para entrenar desarrolladores de Smart Contracts y aplicaciones distribuidas (DApps)
en Cardano.

<<<<<<< HEAD
Este repositorio contiene el ambiente de desarrollo local con las herramientas del curso.

## Cómo usar este ambiente de desarrollo

### Docker

1. Usar la plantilla de este repositorio para crear un nuevo repositorio.
1. Clonar este repositorio en tu computadora.
1. Tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop) en tu computadora.
1. Tener instalado [Visual Studio Code](https://code.visualstudio.com/) con la extensión [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
1. Abrir el directorio del repositorio en Visual Studio Code.
1. Click en el botón verde de la esquina inferior izquierda de Visual Studio Code y seleccionar `Reopen in Container`.

### Demeter

1. Usar la plantilla de este repositorio para crear un nuevo repositorio.
1. Editar el siguiente botón con la ORG (organización) y REPO (repositorio) final:
[![Code in Cardano Workspace](https://demeter.run/code/badge.svg)](https://demeter.run/code?repository=https://github.com/iog-edu-argentina-2024/starter-template.git&template=typescript)
1. Click en el botón y seguir las instrucciones.
1. Agregar Aiken a tu proyecto usando la UI de Demeter.

---

Este repositorio contiene las lecciones, ejemplos, tareas, y guías de instalación
necesarias para completar el curso.

## Estructura del repositorio

Los directorios más relevantes de este repositorio están estructurados de la siguiente manera:

- En el directorio [lecciones](lecciones/), encontrarás el contenido de las lecciones tal
  como son presentadas en clase.

- En el directorio [.devcontainer](.devcontainer/), encontrarás un contenedor de Docker
  creado por el equipo de educación de IOG que provee un ambiente de desarrollo local
  para las lecciones de este curso.

- **Instructor:**
  - [Robertino Martinez](email:robertino.martinez@iohk.io)
- **TAs**
  - [Karina Lopez](email:karina.lopez@iohk.io)

## Lecciones

- 🎞️ [Diapositivas](diapositivas/)
- 👣 Live coding - Follow along
- 👀 Explicar código/documentacion
- ✍️ Ejercicios/Proyecto


| Identificador | Lección                                          |  ✍️ Ejercicios/Proyecto |
|:-------------:|:-------------------------------------------------|:----------------------:|
| **Día 01**    |                                                  |                        | 
| Parte 1       | 🎞️ Introducción al curso                         |          -             |        
| Parte 2       | 🎞️ Introducción a las herramientas               |          -             |        
| Parte 3       | 👣 Preparar ambiente de desarrollo               |          -             |        
| Parte 4       | 🎞️ Criptografía                                  |          -             |         
| Parte 5       | 🎞️ Blockchains, Tx, Bloques, Nodos, y Billeteras |          -             |
| **Día 02**    |                                                  |                        |
| Parte 1       | 🎞️ Modelo UTxO                                   |          -             |        
| Parte 2       |  -️                                               | [Diagramar transacción UTxO](https://classroom.github.com/a/fixcHZ3-) |        
| Parte 3       |  -                                               | [Crear Tx con billetera e inspeccionar con chain explorer](https://classroom.github.com/a/sM70_G3t) |        
| Parte 4       | 🎞️ Modelo (E)UTxO                                |          -             |        
| Parte 5       | 🎞️ On-chain VS Off-chain                         |          -             |        
| **Día 03**    |                                                  |                        | 
| Parte 1       | 👣 Intro a MeshJS y crear primer Tx              |          -             |        
| Parte 2       | 🎞️ Native Scripts                                |          -             |        
| Parte 3       |  -                                               | Crear Multisig         |        
| Parte 4       |  -                                               | Crear Vesting          |        
| Parte 5       |  Native Tokens                                   |          -             |       
| Parte 6       |  -                                               | Mintear/Quemar Tokens  |        
| **Día 04**    |                                                  |                        | 
| Parte 1       | 👣 Crear nuevo proyecto Aiken                    |          -             |        
| Parte 2       | 👀 Aiken: CLI, estructura de proyecto, usar docs |    -        |      
| Parte 3       | 🎞️ Introducción a Aiken                          |          -             |        
| Parte 4       |  -                                               | Lenguaje Aiken         |        
| Parte 5       | 🎞️ Introducción a Validadores Plutus             |          -             |        
| Parte 6       | 👣 Validador "Always true" + off-chain           |         -             |        
| Parte 7       | 👣 Validador "`redeemer == 42`" + off-chain      |    -             |        
| Parte 8       |  -                                               | Validador `redeemer == datum` |        
| **Día 05**    |                                                  |                        | 
| Parte 1       | 🎞️+👣 NextJS - Web2 a Web3                        |          -             |        
| Parte 2       | 🎞️+👣 NextJS - Simple Tx con browser wallet       |   -             |        
| Parte 3       | 🎞️ ScriptContext                                 |          -             |        
| Parte 4       | 👣 (resolver ejercicio luego de 15min)           |  Validador "Consume if signed by" |        
| Parte 5       | 🎞️ Tiempo en validadores Plutus                  |          -             |        
| Parte 6       | 🎞️+👣 Validador "Vesting"                         |          -             |        
| **Día 06**    |                                                  |                        | 
| Parte 1       | 🎞️ Validadores Parametrizados                    |          -             |  
| Parte 2       | 👣 Validador "Vesting" parametrizado             |          -             |        
| Parte 3       | 🎞️ Políticas Monetarias                          |          -             |  
| Parte 4       |                                                  | PM: "Mint if signed by" |        
| Parte 5       |                                                  | PM: "Mint if signed by & Token Name" |        
| Parte 6       | 👣 PM: NFT + Dapp                                |          -             |        
| **Día 07**    |                                                  |                        | 
| Parte 1       | 👣 Oracle + server                               |          -             |        
| Parte 2       |                                                 | Validadores "Gift Card" |        
| **Día 08**    |                                                 |                        | 
| Parte 1       | 🎞️ Pruebas                                      |          -             |  
| **Día 09**    |                                                 |                        | 
| Parte 1       | 👀 Stablecoin Dapp                              |          -             |      
| Parte 2       |                                                | Mejorar Stablecoin     |        
| **Día 10**    |                                                |                        | 
| Examen        |                                                | EXAMEN                 |        

## Contenido Opcional

- **Día 01:** [Bitcoin](https://bitcoin.org/bitcoin.pdf)
- **Día 01:** [Reward Sharing Schemes for Stake Pools](https://arxiv.org/ftp/arxiv/papers/1807/1807.11218.pdf)
- **Día 02:** [The extended UTXO Model](https://api.zotero.org/groups/478201/items/T24L95MI/file/view?key=PnpP8O1NApZMMF0LVNh7I4I5)
- **Día 03:** [UTxO- vs account-based smart contract blockchain programming paradigms](https://arxiv.org/pdf/2003.14271)
- **Día 04:** [Formal Specification of the Plutus Core Language - Capítulos 1 y 2.1](https://intersectmbo.github.io/plutus/resources/plutus-core-spec.pdf)
- **Día 05:** [CIP-0001](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0001) y [CIP-0019](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0019)
- **Día 06:** [Native Custom Tokens in the Extended UTXO Model](https://files.zotero.net/eyJleHBpcmVzIjoxNzE5NDE4MTI3LCJoYXNoIjoiMDBmMTM0NGZkYTg2ZTBhOWJkZWI4ZDhhYjIzZjIzYzAiLCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uXC9wZGYiLCJjaGFyc2V0IjoiIiwiZmlsZW5hbWUiOiJDaGFrcmF2YXJ0eSBldCBhbC4gLSAyMDIwIC0gTmF0aXZlIEN1c3RvbSBUb2tlbnMgaW4gdGhlIEV4dGVuZGVkIFVUWE8gTW9kZWwucGRmIn0%3D/3e79305c6f6ddfb40db32e62cbee6c358351b4741d0b49f32fbb9560bcdb5772/Chakravarty%20et%20al.%20-%202020%20-%20Native%20Custom%20Tokens%20in%20the%20Extended%20UTXO%20Model.pdf)
- **Día 07:** [CIP-0031](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0031) y [CIP-0033](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0033)
- **Día 08:** [QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs](https://dl.acm.org/doi/pdf/10.1145/357766.351266)
- **Día 09:** [Djed: A Formally Verified Crypto-Backed Pegged Algorithmic Stablecoin](https://eprint.iacr.org/2021/1069.pdf)
---

Este trabajo está licenciado bajo la licencia
[Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

<figure><img src="https://i.creativecommons.org/l/by/4.0/88x31.png" alt="Creative Commons License BY 4.0"></figure>
