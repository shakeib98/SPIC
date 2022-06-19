//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/access/Ownable.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "@openzeppelin/token/ERC721/IERC721.sol";
import "./semaphore/extension/SemaphoreVoting.sol";

contract SPIC is SemaphoreVoting{

    uint256 public votersIncentive;
    address public mockToken;
    address public nftToken;
    address public constant RELAYER = address(0);
    address public constant OWNER = address(0);
    uint32 public epochDuration;
    uint8 public constant MAX_LEAVES = 8;

    mapping(uint256 => mapping(address => bool)) public contributors;

    event EpochDurationChange(uint32 _oldDuration, uint32 _newDuration);
    event VotersIncentiveChange(uint256 _oldIncentive, uint256 _newIncentive);
    event ContributorAdded(address _contributor, uint256 _id);

    constructor(address _mockToken, address _nftToken, uint256 _votersIncentive, uint32 _epochDuration) public {
        emit EpochDurationChange(epochDuration, _epochDuration);
        emit VotersIncentiveChange(votersIncentive, _votersIncentive);
        
        epochDuration = _epochDuration;
        votersIncentive = _votersIncentive;
        mockToken = _mockToken;
        nftToken = _nftToken;
    }

    function createCircle(uint256 _id, uint256 _matchAmount, uint256 _startEpoch, uint256 _endEpoch) external{
        require(msg.sender == OWNER);
        require(_startEpoch > block.timestamp && _startEpoch != _endEpoch, "Invalid EPOCH value");
        
        createPoll(_id, msg.sender, MAX_LEAVES,_matchAmount, _startEpoch, _endEpoch);

        IERC20(mockToken).transferFrom(msg.sender, address(this), _matchAmount);

    }

    function addContributors(uint256 _id, address[] calldata _addresses) external{
        require(msg.sender == OWNER);
        require(polls[pollId].state == PollState.Created, "SemaphoreVoting: poll has already been started");

        for(uint8 i=0; i<_addresses.length; i++){
            contributors[_id][_addresses[i]] = true;

            emit ContributorAdded(_addresses[i],_id);
        }
    }

    function becomeVoter(uint256 _id, uint256 identityCommitment, uint256 _tokenId) external {
        IERC721(nftToken).transferFrom(msg.sender, address(this), _tokenId);
        addVoter(_id, _identityCommitment);
    }

    function castVote(){

    }

    function withdrawNFT(){

    }

    function getCompensation(){

    }

    function getMatchAmountPerCircle(bytes32 _id) external view returns(uint256){
        return polls[_id].matchAmount;
    }

    function changeEpochDuration(){

    }

    function changeVotersIncentive(){
        
    }

}
