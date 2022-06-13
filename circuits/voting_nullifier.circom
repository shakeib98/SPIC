pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./tree.circom";

template VotingCommitment(nLevels) {
    signal input identityNullifier;
    signal input merklePath[nLevels];
    signal input pathIndices[nLevels];

    signal input votingNullifier[2];

    signal output votingCommitmentHashed;
    signal output mRoot;

    //GENERATE VN
    component votingNullifierHasher = Poseidon(2);
    votingNullifierHasher.inputs[0] <== votingNullifier[0];
    votingNullifierHasher.inputs[1] <== votingNullifier[1];

    //GENERATE VC
    component votingCommitmentHasher =  Poseidon(2);
    votingCommitmentHasher.inputs[0] <== identityNullifier;
    votingCommitmentHasher.inputs[2] <== votingNullifierHasher.out;

    votingCommitmentHashed <== votingCommitmentHasher.out;

    //VERIFY MERKLE INCLUSION PROOF
    component merklePathVerifier = MerkleTreeInclusionProof(nLevels);

    merklePathVerifier.leaf <== votingCommitmentHashed;

    for (var i = 0; i < nLevels; i++) {
        merklePathVerifier.siblings[i] <== merklePath[i];
        merklePathVerifier.pathIndices[i] <== pathIndices[i];
    }

    //MR CONSTRAINT
    mRoot <== merklePathVerifier.root;

}
