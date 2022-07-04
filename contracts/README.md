# CONTRACTS

This folder contains the contracts for the SPIC.

To install dependencies:

``` bash
npm install
```

You have to update the solidity version of the verifier contracts (P.S, you need them first and see the circuits README.md file to get them).

Go to scripts folder and update the path in *bump-solidity.js* file. 

Run 

``` bash
node bump-solidity.js
``` 

To compile contracts run:

``` bash
npx hardhat compile
```

To deploy: (first update the artifacts path if needed)

``` bash
npx hardhat run --network <name> scripts/deploy.ts
``` 

You have to run the deploy.ts file outside of the scripts folder. 

To run tests (Update the paths where needed)

``` bash 
npx hardhat test
```