# #!/bin/bash

# cd ../contracts/circuits
# mkdir MastermindVariation

# if [ -f ./powersOfTau28_hez_final_10.ptau ]; then
#     echo "powersOfTau28_hez_final_10.ptau already exists. Skipping."
# else
#     echo 'Downloading powersOfTau28_hez_final_10.ptau'
#     wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
# fi

# echo "Compiling MastermindVariation.circom..."

# # compile circuit

# circom MastermindVariation.circom --r1cs --wasm --sym -o ./MastermindVariation
# snarkjs r1cs info ./MastermindVariation/MastermindVariation.r1cs

# # Start a new zkey and make a contribution

# snarkjs groth16 setup ./MastermindVariation/MastermindVariation.r1cs powersOfTau28_hez_final_10.ptau ./MastermindVariation/circuit_0000.zkey
# snarkjs zkey contribute ./MastermindVariation/circuit_0000.zkey ./MastermindVariation/circuit_final.zkey --name="1st Contributor Name" -v -e="random text"
# snarkjs zkey export verificationkey ./MastermindVariation/circuit_final.zkey ./MastermindVariation/verification_key.json

# # generate solidity contract
# snarkjs zkey export solidityverifier MastermindVariation/circuit_final.zkey ../verifier.sol

# cd ../..