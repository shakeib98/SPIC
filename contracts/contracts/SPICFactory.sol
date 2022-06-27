//////////////////////////// NOT USED /////////////////////////////////


// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "./SPIC.sol";
// import "./interfaces/ISPIC.sol";
// import "@openzeppelin/contracts/utils/Create2.sol";

// contract SPICFactory {
//     address[] public spicRegistery;
//     mapping(address => address) public spicData;

//     event SPICCreated(
//         address _mockToken,
//         address _nftToken,
//         address _owner,
//         address _relayer,
//         uint256 _votersIncentive
//     );

//     function deploySPIC(
//         address _mockToken,
//         address _nftToken,
//         address _owner,
//         address _relayer,
//         uint256 _votersIncentive
//     ) external {
//         require(
//             spicData[_nftToken] != address(0),
//             "Organization already created"
//         );
//         bytes memory bytecode = type(SPIC).creationCode;
//         bytes32 salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
//         address spic = Create2.deploy(0, salt, bytecode);

//         spicRegistery.push(spic);
//         spicData[_nftToken] = spic;

//         ISPIC(spic).setParamter(
//             _mockToken,
//             _nftToken,
//             _owner,
//             _relayer,
//             _votersIncentive
//         );

//         emit SPICCreated(
//             _mockToken,
//             _nftToken,
//             _owner,
//             _relayer,
//             _votersIncentive
//         );
//     }

//     function getLength() external view returns (uint256) {
//         return spicRegistery.length;
//     }
// }
