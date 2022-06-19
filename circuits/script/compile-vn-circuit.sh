# #!/bin/bash

cd ..
mkdir votingnullifier
cd votingnullifier

if [ -f ./powersOfTau28_hez_final_10.ptau ]; then
    echo "powersOfTau28_hez_final_10.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_10.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
fi

echo "Compiling voting_nullifier.circom..."

# compile circuit

circom ../src/voting_nullifier.circom --r1cs --wasm --sym -o .
snarkjs r1cs info voting_nullifier.r1cs

# Start a new zkey and make a contribution

snarkjs groth16 setup voting_nullifier.r1cs powersOfTau28_hez_final_10.ptau ./circuit_0000.zkey
snarkjs zkey contribute ./circuit_0000.zkey ./circuit_final.zkey --name="1st Contributor Name" -v -e="random text"
snarkjs zkey export verificationkey ./circuit_final.zkey ./verification_key.json

# # generate solidity contract
snarkjs zkey export solidityverifier ./circuit_final.zkey ./verifier.sol

# cd ../..