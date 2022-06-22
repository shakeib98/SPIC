
const fs = require('fs')
const path = require('path')
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

let content = fs.readFileSync(path.resolve('contracts/verifier/verifierIc.sol'), { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0');

fs.writeFileSync(path.resolve('contracts/verifier/verifierIc.sol'), bumped);


let content2 = fs.readFileSync(path.resolve('contracts/verifier/verifierVc.sol'), { encoding: 'utf-8'});
let bumped2 = content2.replace(solidityRegex, 'pragma solidity ^0.8.0');
fs.writeFileSync(path.resolve('contracts/verifier/verifierVc.sol'), bumped2);