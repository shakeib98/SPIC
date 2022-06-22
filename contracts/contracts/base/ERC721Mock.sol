//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721("MOCK", "MC"){
    function mint(uint256 tokenId) external {
        _safeMint(msg.sender, tokenId);
    }

    function transfer(address to, uint256 tokenId) external {
        _transfer(msg.sender,to,tokenId);
    }
}

