//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../base/SemaphoreGroups.sol";
import "../interfaces/IVerifier.sol";
import "../interfaces/IVerifierIC.sol";
import "hardhat/console.sol";

contract SemaphoreVoting is SemaphoreGroups {
    address public VERIFIER_IDENTITY = 0xeE2D932bb05E10a710944E94d8AA58c2873ab173; //TEST NET ADDRESS

    address public VERIFIER_VOTE = 0xC71e5bB4515e9520c9dAD91423738394f104EeCd; //TEST NET ADDRESS

    uint256 internal ZERO_VALUE = 21663839004416932945382355908790599225266501822907911457504978515578255421292;

    struct Poll {
        uint256 matchAmount;
        uint256 startEpoch;
        uint256 endEpoch;
        address coordinator;
        uint8 activeContributorsCount;
    }

    mapping(uint256 => Poll) public polls;

    function createPoll(
        uint256 pollId,
        address coordinator,
        uint256 matchAmountPoll,
        uint256 startEpochTime,
        uint256 endEpochTime,
        uint8 depth
    ) internal {    
        // console.log("Z=====================>",ZERO_VALUE);

        _createGroup(pollId, depth, ZERO_VALUE); //both of the trees are initialized

        Poll memory poll;

        poll.coordinator = coordinator;

        poll.matchAmount = matchAmountPoll;

        poll.startEpoch = startEpochTime;

        poll.endEpoch = endEpochTime;

        polls[pollId] = poll;
    }

    function castVote(
        uint256 mRootIc,
        uint256 votingCommitment,
        uint256 _pollId,
        uint256[8] calldata proofIc
    ) internal {

        _addVote(_pollId, votingCommitment);

        _verifyProofIC(mRootIc, proofIc);

        polls[_pollId].activeContributorsCount = polls[_pollId].activeContributorsCount + 1;

        console.log(polls[_pollId].activeContributorsCount );
    }

    function _verifyProofIC(uint256 mRootIc, uint256[8] calldata proofIc)
        internal
        returns (bool r)
    {
        r = IVerifierIC(VERIFIER_IDENTITY).verifyProof(
            [proofIc[0], proofIc[1]],
            [[proofIc[2], proofIc[3]], [proofIc[4], proofIc[5]]],
            [proofIc[6], proofIc[7]],
            [mRootIc]
        );
    }

    function _verifyProofVC(
        uint256 votingCommitment,
        uint256 mRootVc,
        uint256 pollId,
        address pkContributor,
        uint256[8] calldata proofVc
    ) internal returns (bool r) {
        require(
            vcValidity[votingCommitment],
            "Voting and identity commitment does not exist"
        );

        r = IVerifier(VERIFIER_VOTE).verifyProof(
            [proofVc[0], proofVc[1]],
            [[proofVc[2], proofVc[3]], [proofVc[4], proofVc[5]]],
            [proofVc[6], proofVc[7]],
            [votingCommitment, mRootVc, pollId, uint256(uint160(address(pkContributor)))] //to make array unified
        );
    }
}
