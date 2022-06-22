//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721Transfer is IERC721{
    function transfer(address to, uint256 tokenId) external;
}