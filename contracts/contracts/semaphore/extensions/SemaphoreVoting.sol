//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../interfaces/ISemaphoreVoting.sol";
import "../base/SemaphoreCore.sol";
import "../base/SemaphoreGroups.sol";

/// @title Semaphore voting contract.
/// @dev The following code allows you to create polls, add voters and allow them to vote anonymously.
contract SemaphoreVoting is ISemaphoreVoting, SemaphoreCore, SemaphoreGroups {
    
    address public VERIFIER_IDENTITY;

    address public VERIFIER_VOTE;

    /// @dev Gets a poll id and returns the poll data.
    mapping(uint256 => Poll) internal polls;

    constructor() {
        require(
            depths.length == verifierAddresses.length,
            "SemaphoreVoting: parameters lists does not have the same length"
        );

        for (uint8 i = 0; i < depths.length; i++) {
            verifiers[depths[i]] = IVerifier(verifierAddresses[i]);
        }
    }

    /// @dev Checks if the poll coordinator is the transaction sender.
    /// @param pollId: Id of the poll.
    modifier onlyCoordinator(uint256 pollId) {
        require(polls[pollId].coordinator == _msgSender(), "SemaphoreVoting: caller is not the poll coordinator");
        _;
    }

    /// @dev See {ISemaphoreVoting-createPoll}.
    function createPoll(
        uint256 pollId,
        address coordinator,
        uint256 matchAmountPoll,
        uint256 startEpochTime,
        uint256 endEpochTime,
        uint8 depth
    ) public override {
        require(address(verifiers[depth]) != address(0), "SemaphoreVoting: depth value is not supported");

        _createGroup(pollId, depth, 0); //both of the trees are initialized

        Poll memory poll;

        poll.coordinator = coordinator;

        poll.matchAmount = matchAmountPoll;

        poll.startEpoch = startEpochTime;

        poll.endEpoch = endEpochTime;

        polls[pollId] = poll;

        emit PollCreated(pollId, coordinator, matchAmountPoll, startEpochTime, endEpochTime);
    }

    /// @dev See {ISemaphoreVoting-addVoter}.
    function addVoter(uint256 pollId, uint256 identityCommitment) public override {

        _addMember(pollId, identityCommitment);
    }

    //TODO
    // /// @dev See {ISemaphoreVoting-castVote}.
    // function castVote(
    //     bytes32 vote,
    //     uint256 nullifierHash,
    //     uint256 pollId,
    //     uint256[4] calldata proofIc,
    //     uint256[4] calldata 
    // ) public override {
    //     Poll memory poll = polls[pollId];

    //     _addVote(pollId,nullifierHash);

    //     uint8 depth = getDepth(pollId);
    //     uint256 root = getRoot(pollId);


    //     _verifyProof(vote, root, nullifierHash, pollId, proof, verifier);
    //     //add the voting verifier method

    //     // Prevent double-voting (nullifierHash = hash(pollId + identityNullifier)).
    //     _saveNullifierHash(nullifierHash);

    //     emit VoteAdded(pollId, vote);
    // }

    // function addVote(uint256 pollId, uint256 externalNullifier) public override {
    //     _addVote(pollId, externalNullifier);
    // }
}
