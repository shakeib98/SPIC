pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template VotingNullifier(nLevels) {
    signal input identityNullifier;
    signal input merklePath[nLevels];
    signal input pathIndices[nLevels];

    signal input identityCommitment;
    signal input votingNullifier[2];
    signal input merkleRoot;
   

    signal output out;

    signal votingNullierHashed;

    //TODO the verification part
}

component VotingNullifier{identityCommitment. votingNullifier, merkleRoot} = VotingNullifier(3);
