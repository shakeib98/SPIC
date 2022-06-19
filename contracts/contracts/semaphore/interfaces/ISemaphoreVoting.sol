//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title SemaphoreVoting interface.
/// @dev Interface of SemaphoreVoting contract.
interface ISemaphoreVoting {
    struct Poll {
        uint256 matchAmount;
        uint256 startEpoch;
        uint256 endEpoch;
        address coordinator; 
        uint8 activeContributorsCount;
    }

    /// @dev Emitted when a new poll is created.
    /// @param pollId: Id of the poll.
    /// @param coordinator: Coordinator of the poll.
    event PollCreated(uint256 pollId, address indexed coordinator, uint256 matchAmount,uint256 startEpoch,uint256 endEpoch);

    /// @dev Emitted when a poll is started.
    /// @param pollId: Id of the poll.
    /// @param coordinator: Coordinator of the poll.
    /// @param encryptionKey: Key to encrypt the poll votes.
    event PollStarted(uint256 pollId, address indexed coordinator, uint256 encryptionKey);

    /// @dev Emitted when a user votes on a poll.
    /// @param pollId: Id of the poll.
    /// @param vote: User encrypted vote.
    event VoteAdded(uint256 indexed pollId, bytes32 vote);

    event VoteAddedToRoot(uint256 groupId, uint256 externalNullifier, uint256 root);

    /// @dev Emitted when a poll is ended.
    /// @param pollId: Id of the poll.
    /// @param coordinator: Coordinator of the poll.
    /// @param decryptionKey: Key to decrypt the poll votes.
    event PollEnded(uint256 pollId, address indexed coordinator, uint256 decryptionKey);

    /// @dev Creates a poll and the associated Merkle tree/group.
    /// @param pollId: Id of the poll.
    /// @param coordinator: Coordinator of the poll.
    /// @param depth: Depth of the tree.
    function createPoll(
        uint256 pollId,
        address coordinator,
        uint8 depth
    ) external;

    /// @dev Adds a voter to a poll.
    /// @param pollId: Id of the poll.
    /// @param identityCommitment: Identity commitment of the group member.
    function addVoter(uint256 pollId, uint256 identityCommitment) external;

    function addVote(uint256 pollId, uint256 externalNullifier) external;

    /// @dev Casts an anonymous vote in a poll.
    /// @param vote: Encrypted vote.
    /// @param nullifierHash: Nullifier hash.
    /// @param pollId: Id of the poll.
    /// @param proof: Private zk-proof parameters.
    function castVote(
        bytes32 vote,
        uint256 nullifierHash,
        uint256 pollId,
        uint256[8] calldata proof
    ) external; //TO ADD DIFFERENT PROOF AS WELL

}
