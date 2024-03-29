pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./tree.circom";

template IdentityCommitmentGenerator(nLevels) {
    signal input identityNullifier;
    signal input identityTrapdoor;
    signal input secret;
    signal input merklePath[nLevels];
    signal input pathIndices[nLevels];

    // signal input nftId;
    // signal input nftAddress;

    signal input mRoot;

    signal identityCommitmentHashed;
    // GENERATE IC
    component identityCommitmentHasher = Poseidon(3);

    identityCommitmentHasher.inputs[0] <== identityNullifier;
    identityCommitmentHasher.inputs[1] <== identityTrapdoor;
    identityCommitmentHasher.inputs[2] <== secret;
    // identityCommitmentHasher.inputs[3] <== nftId;
    // identityCommitmentHasher.inputs[4] <== nftAddress;

    //IC CONSTRAINT
    identityCommitmentHashed <== identityCommitmentHasher.out;

    //VERIFY MERKLE INCLUSION PROOF
    component merklePathVerifier = MerkleTreeInclusionProof(nLevels);

    merklePathVerifier.leaf <== identityCommitmentHashed;

    for (var i = 0; i < nLevels; i++) {
        merklePathVerifier.siblings[i] <== merklePath[i];
        merklePathVerifier.pathIndices[i] <== pathIndices[i];
    }

    //MR CONSTRAINT
    mRoot === merklePathVerifier.root;

}

component main {public [mRoot]}= IdentityCommitmentGenerator(3);