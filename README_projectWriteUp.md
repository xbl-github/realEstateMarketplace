# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 
## Setup
Use 
`npm install`  
to install node modules.

## Contract Addresses
These are my contract addresses after deploying to rinkeby.
REMarketPlaceERC721Token

   > contract address:    0xe62715299e68aC4c8Ad0A5A8f01d920759F192F9

Verifier
   > contract address:    0x3c4458Fb47eEB8084877395Bfc03bbC86320497D

SolnSquareVerifier

   > contract address:    0xb87A6d436b055cEE315Dab13320Af9dD5465A496


## OpenSeas

Zokrates was _not_ used for minting, as I asked a mentor and they said this is fine for this exercise.

The ABI and address for REMarketPlaceERC721Token is used to mint tokens in <https://www.myetherwallet.com>, these tokens are then listed in OpenSea market place.  The ABI is in the `RE-token-AI-used-for-minting.txt` file.  The real estate listing are below:


<https://rinkeby.opensea.io/assets/0xe62715299e68ac4c8ad0a5a8f01d920759f192f9/1>  
<https://rinkeby.opensea.io/assets/0xe62715299e68ac4c8ad0a5a8f01d920759f192f9/2>  
<https://rinkeby.opensea.io/assets/0xe62715299e68ac4c8ad0a5a8f01d920759f192f9/3>  
<https://rinkeby.opensea.io/assets/0xe62715299e68ac4c8ad0a5a8f01d920759f192f9/4>  
<https://rinkeby.opensea.io/assets/0xe62715299e68ac4c8ad0a5a8f01d920759f192f9/5>  


The store front link:
<https://rinkeby.opensea.io/assets/real-estate-market-place>

## Test

Tests are run for each contract separately to avoid a nonce error.

`truffle test test/TestERC721Mintable.js`  
`truffle test test/TestSquareVerifier.js`  
`truffle test test/TestSolnSquareVerifier.js`  

## Running Zokrates
Zokrates was used to test the square verifier and SolnSquareVerifier contracts.  An earlier version of zokrates was used to avoid an "expected array value" error.

docker run -v ~/udacity/blockchain/project5_real-estate-market-DOESNTRUN/zokrates/code/square:/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash

Commands for running zokrates:
`~/zokrates compile -i square.code`  
`~/zokrates setup`  
`~/zokrates compute-witness -a 3 9`  
`~/zokrates generate-proof`  
`~/zokrates export-verifier`  

## Project Resources
I have studied other public github code as well as the Knowledge Post and Student hub.  

In addition, the following are useful resources:
* [The anatomy of ERC721](https://medium.com/crypto-currently/the-anatomy-of-erc721-e9db77abfc24)
* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
