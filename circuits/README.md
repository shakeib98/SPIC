# CIRCUITS

This folder contains all the circom circuits used in the SPIC.

There are 3 circom circuits. 

- IdentityCommitment
- Tree 
- VotingNullifier

Main circuits are Identity and Voting. Tree is a supporting circuit.

*Install dependencies*

To install all the dependencies run:

``` bash
npm install
```

* Please update the paths in the scripts folder files a/c

To compile circuits go to scripts folder and run 
``` bash
chmod +x compile-ic-circuit.sh && chmod +x compile-vn-circuit.sh
```

run 

```
./compile-ic-circuit.sh
```

```
./compile-vn-circuit.sh
```

This will create two folders for each circuits. And Verifier contracts will be in the contracts folder. You can use wasm file in testing and front-end.