//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface ISPIC {

    function createCircle(
        uint256 _id,
        uint256 _matchAmount,
        uint256 _startEpoch,
        uint256 _endEpoch
    ) external;

    function addContributors(uint256 _id, address[] calldata _addresses)
        external;

    function becomeVoter(
        uint256 _id,
        uint256 identityCommitment,
        uint256 _tokenId
    ) external;

    function castVoteExternal(
        address pk,
        uint256 mRootIc,
        uint256 votingCommitment,
        uint256 _pollId,
        uint256[8] calldata proofIc
    ) external;

    function withdrawNFT(
        uint256 nftId,
        uint256 votingCommitment,
        uint256 mRootVc,
        uint256 pollId,
        address pkContributor,
        address nftAddress,
        uint256[8] calldata proofVc
    ) external;

    function receiveCompensation(uint256 pollId) external;
}
