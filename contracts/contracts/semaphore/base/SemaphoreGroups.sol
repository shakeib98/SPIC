//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {SNARK_SCALAR_FIELD} from "./SemaphoreConstants.sol";
import "@zk-kit/incremental-merkle-tree.sol/contracts/IncrementalBinaryTree.sol";
import "hardhat/console.sol";

/// @title Semaphore groups contract.
/// @dev The following code allows you to create groups, add and remove members.
/// You can use getters to obtain informations about groups (root, depth, number of leaves).
abstract contract SemaphoreGroups {
    using IncrementalBinaryTree for IncrementalTreeData;

    /// @dev Gets a group id and returns the group/tree data.
    mapping(uint256 => IncrementalTreeData) public groups;
    mapping(uint256 => IncrementalTreeData) public votersGroup;

    mapping(uint256 => bool) internal icValidity;
    mapping(uint256 => bool) internal vcValidity;

    /// @dev Creates a new group by initializing the associated tree.
    /// @param groupId: Id of the group.
    /// @param depth: Depth of the tree.
    /// @param zeroValue: Zero value of the tree.
    function _createGroup(
        uint256 groupId,
        uint8 depth,
        uint256 zeroValue
    ) internal virtual {
        require(
            groupId < SNARK_SCALAR_FIELD,
            "SemaphoreGroups: group id must be < SNARK_SCALAR_FIELD"
        );
        require(
            getDepth(groupId) == 0,
            "SemaphoreGroups: group already exists"
        );
        // console.log("ZEEE ========================> ", zeroValue);
        groups[groupId].init(depth, zeroValue);

        votersGroup[groupId].init(depth, zeroValue);
    }

    /// @dev Adds an identity commitment to an existing group.
    /// @param groupId: Id of the group.
    /// @param identityCommitment: New identity commitment.
    function _addMember(uint256 groupId, uint256 identityCommitment)
        internal
        virtual
    {
        require(
            getDepth(groupId) != 0,
            "SemaphoreGroups: group does not exist"
        );
        require(
            !icValidity[identityCommitment],
            "SemaphoreGroups: identity already exists"
        );

        groups[groupId].insert(identityCommitment);

        icValidity[identityCommitment] = true;

    }

    /// @dev Adds an identity commitment to an existing group.
    /// @param groupId: Id of the group.
    /// @param externalNullifier: New external nullifier of vote.
    function _addVote(uint256 groupId, uint256 externalNullifier)
        internal
        virtual
    {
        require(
            getDepth(groupId) != 0,
            "SemaphoreGroups: group does not exist"
        );
        require(
            !vcValidity[externalNullifier],
            "SemaphoreGroups: vote already exists"
        );

        votersGroup[groupId].insert(externalNullifier);

        vcValidity[externalNullifier] = true;

    }

    /// @dev See {ISemaphoreGroups-getRoot}.
    function getRoot(uint256 groupId)
        public
        view
        returns (uint256, uint256)
    {
        return (groups[groupId].root, votersGroup[groupId].root);
    }

    /// @dev See {ISemaphoreGroups-getDepth}.
    function getDepth(uint256 groupId)
        public
        view
        returns (uint8)
    {
        //Depth of both mapping will be same
        return groups[groupId].depth;
    }

    /// @dev See {ISemaphoreGroups-getNumberOfLeaves}.
    function getNumberOfLeaves(uint256 groupId)
        public
        view
        returns (uint256)
    {
        //no of leaves of both mapping will be same
        return groups[groupId].numberOfLeaves;
    }
}
