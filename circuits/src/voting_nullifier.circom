pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./tree.circom";

template VotingCommitment(nLevels) {
    signal input identityNullifier;
    signal input merklePath[nLevels];
    signal input pathIndices[nLevels];
    
    signal input circle_id;
    signal input pk;

    signal output votingCommitmentHashed;
   
    signal output mRoot;

    //GENERATE VC
    component votingCommitmentHasher =  Poseidon(3);
    votingCommitmentHasher.inputs[0] <== identityNullifier;
    votingCommitmentHasher.inputs[1] <== circle_id;
    votingCommitmentHasher.inputs[2] <== pk;

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

component main{public [circle_id, pk]} = VotingCommitment(3);


