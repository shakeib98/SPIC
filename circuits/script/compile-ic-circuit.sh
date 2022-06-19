# #!/bin/bash

cd ..
mkdir identitycommitment
cd identitycommitment

if [ -f ./powersOfTau28_hez_final_11.ptau ]; then
    echo "powersOfTau28_hez_final_11.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_11.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_11.ptau
fi

echo "Compiling identity_commitment.circom..."

# compile circuit

circom ../src/identity_commitment.circom --r1cs --wasm --sym -o .
snarkjs r1cs info identity_commitment.r1cs

# Start a new zkey and make a contribution

snarkjs groth16 setup identity_commitment.r1cs powersOfTau28_hez_final_11.ptau ./circuit_0000.zkey
snarkjs zkey contribute ./circuit_0000.zkey ./circuit_final.zkey --name="1st Contributor Name" -v -e="random text"
snarkjs zkey export verificationkey ./circuit_final.zkey ./verification_key.json

# # generate solidity contract
snarkjs zkey export solidityverifier ./circuit_final.zkey ./verifier.sol

# cd ../..