//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./semaphore/extensions/SemaphoreVoting.sol";
import "./interfaces/ISPIC.sol";
import "./interfaces/IERC721Transfer.sol";

contract SPIC is SemaphoreVoting, ISPIC {
    uint256 public votersIncentive;
    address public mockToken;
    address public nftToken;
    address public RELAYER;
    address public OWNER;
    uint8 public constant MAX_LEAVES = 8;
    uint8 public voterIndex = 0;
    uint8 public votesIndex = 0;

    mapping(uint256 => mapping(address => Contributor)) public contributors;

    struct Contributor {
        uint8 voteCount;
        bool status;
    }

    event ContributorAdded(address _contributor, uint256 _id);

    event CompensationReceived(
        address _contributor,
        uint256 _id,
        uint256 _amount
    );

    event NFTWithdrawn(address user, uint256 nftId);

    event VoteCasted(
        uint256 pollId,
        uint256 votingCommitment,
        address pkContributor,
        uint8 index
    );

    event VoterAdded(
        address user,
        uint256 id,
        uint256 identityCommitment,
        uint256 _tokenId,
        uint8 index
    );

    event CircleCreated(
        uint256 _id,
        uint256 _matchAmount,
        uint256 _startEpoch,
        uint256 _endEpoch
    );

    constructor(
        address _mockToken,
        address _nftToken,
        address _owner,
        address _relayer,
        uint256 _votersIncentive
    ) {
        votersIncentive = _votersIncentive;
        mockToken = _mockToken;
        nftToken = _nftToken;
        OWNER = _owner;
        RELAYER = _relayer;
    }

    function createCircle(
        uint256 _id,
        uint256 _matchAmount,
        uint256 _startEpoch,
        uint256 _endEpoch
    ) external override{
        require(msg.sender == OWNER);
        require(
            _startEpoch > block.timestamp && _startEpoch != _endEpoch,
            "Invalid EPOCH value"
        );

        createPoll(
            _id,
            msg.sender,
            _matchAmount,
            _startEpoch,
            _endEpoch,
            MAX_LEAVES
        );

        IERC20(mockToken).transferFrom(msg.sender, address(this), _matchAmount);

        emit CircleCreated(_id, _matchAmount, _startEpoch, _endEpoch);
    }

    function addContributors(uint256 _id, address[] calldata _addresses)
        external override
    {
        require(msg.sender == OWNER);
        require(polls[_id].endEpoch > block.timestamp);
        for (uint8 i = 0; i < _addresses.length; i++) {
            contributors[_id][_addresses[i]].status = true;

            emit ContributorAdded(_addresses[i], _id);
        }
    }

    function becomeVoter(
        uint256 _id,
        uint256 identityCommitment,
        uint256 _tokenId
    ) external override{
        require(polls[_id].startEpoch > block.timestamp);
        IERC721Transfer(nftToken).transferFrom(msg.sender, address(this), _tokenId);
        _addMember(_id, identityCommitment);

        emit VoterAdded(msg.sender, _id, identityCommitment, _tokenId, voterIndex++);
    }

    function castVoteExternal(
        address pk,
        uint256 mRootIc,
        uint256 votingCommitment,
        uint256 _pollId,
        uint256[8] calldata proofIc
    ) external override{
        require(polls[_pollId].endEpoch > block.timestamp);
        require(contributors[_pollId][pk].status);
        require(msg.sender == RELAYER);

        contributors[_pollId][pk].voteCount++;

        castVote(mRootIc, votingCommitment, _pollId, proofIc);

        emit VoteCasted(_pollId, votingCommitment, pk, votesIndex++);
    }

    function withdrawNFT(
        uint256 nftId,
        uint256 votingCommitment,
        uint256 mRootVc,
        uint256 pollId,
        address pkContributor,
        address nftAddress,
        uint256[8] calldata proofVc
    ) external override{
        require(polls[pollId].endEpoch < block.timestamp);
        require(nftAddress == nftToken);
        address owner = IERC721Transfer(nftAddress).ownerOf(nftId);
        require(owner == address(this));
        _verifyProofVC(
            votingCommitment,
            mRootVc,
            pollId,
            pkContributor,
            proofVc
        );

        address user = msg.sender;

        uint256 perVoterRewardAmount = (((polls[pollId].matchAmount *
            votersIncentive) / polls[pollId].activeContributorsCount) * 1000);
        IERC20(mockToken).transfer(user, perVoterRewardAmount);
        IERC721Transfer(nftAddress).transfer(user, nftId);

        emit NFTWithdrawn(user, nftId);
    }

    function receiveCompensation(uint256 pollId) external override{
        require(contributors[pollId][msg.sender].status);
        require(polls[pollId].endEpoch < block.timestamp);

        uint256 perVoterRewardAmount = polls[pollId].matchAmount -
            ((polls[pollId].matchAmount * votersIncentive) / 1000);

        uint256 derivedCompensation = perVoterRewardAmount *
            contributors[pollId][msg.sender].voteCount;

        IERC20(mockToken).transfer(msg.sender, derivedCompensation);

        emit CompensationReceived(msg.sender, pollId, derivedCompensation);
    }
}
