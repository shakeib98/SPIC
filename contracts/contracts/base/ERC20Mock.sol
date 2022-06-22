//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 

contract MockERC20 is ERC20("MOCK20", "MC") {
    constructor() public {
        _mint(msg.sender, 1000e18);
    }
}
