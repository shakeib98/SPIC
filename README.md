# SPIC 

SPIC (Semaphore Protected Incentivized Community)

[WEBSITE](https://spic-frontend.vercel.app/)

[DEMO](https://youtu.be/YEfPC22YyTw)

## Table of Contents 

- [Addresses](#address)
- [Introduction](#introduction)
- [Project Overview](#project-overview)
    - [Actors](#actors)
    - [Design](#design)
    - [System Design](#system-design)
- [Out Of Scopte](#out-of-scope)
- [Run Locally](#run-locally)

## Address

MINT YOUR ERC20 and ERC721 while using app on testnet. 

- SPIC TESTNET (RINKEBY): [0x82F2Ce19e0C1818412644C430b5a592EA738aD58](https://rinkeby.etherscan.io/address/0x82F2Ce19e0C1818412644C430b5a592EA738aD58)
- MOCK ERC20 (RINKEBY) : [0xBa066A3eD619E3C08788c2bd17CD634cE72f47aE](https://rinkeby.etherscan.io/address/0x82F2Ce19e0C1818412644C430b5a592EA738aD58)
- MOCK ERC721 (RINKEBY) : [0x01F10f6D4D0E89690F2Bc807fEC341d765755aEC](https://rinkeby.etherscan.io/address/0x01F10f6D4D0E89690F2Bc807fEC341d765755aEC)
- RINKEBY FAUCET : [FAUCET](https://faucet.rinkeby.io/)


- SPIC MAINNET (POLYGON): [0x07091125FF27b9f4fE312Ff4940cf3fEc36B38FB](https://polygonscan.com/address/0x07091125FF27b9f4fE312Ff4940cf3fEc36B38FB)
- MOCK ERC20 (POLYGON) : [0x53A9a2E4b5BDd3567B3A689050b9beE7F6F1C974](https://polygonscan.com/address/0x53A9a2E4b5BDd3567B3A689050b9beE7F6F1C974)
- MOCK ERC721 (POLYGON) : [0xFAC0D24db149b79cA0bd9781E1eBA7B30a7A8160](https://polygonscan.com/address/0xFAC0D24db149b79cA0bd9781E1eBA7B30a7A8160)

* You can mint your NFT and Tokens on mainnet as well and on testnet both. Testnet URL is not live yet. So only polygon mainnet can be used with 8 mints of epoch. 

## Introduction:

This project has extended the idea of Coordinape. Coordinape is a DAO tool that is used to reward community incentives, grants, and payroll through community derived voting process. 

The way coordinape works is an intersection between how corporate organizations handle these sorts of tasks and how a purely decentralized flat hierarchy based system will handle it. 

Coordinape works the following way:
- You have an organization owner
- You have a coordinator who creates a circle and adds people in that circle by there public address
- These members are allocated with GIVE tokens (which are offchain tokens)
- Each member of circle can allocate or vote these GIVE tokens to another person of the circle
- By the end of EPOCH, GIVE tokens are converted into GET tokens which can be redeemed by the user in place of USDC

This is the basic overview of how coordinape works. 

But what if we introduce the notion of semaphore framework in order to hide the identities of the voters while voting, while maintaining the transparency of the process. GIVE tokens allocation won't be needed in this system as the flow of the system is different because of the integration of the zero-knowledge part. 

## Project Overview:
Users can create semaphore identity, the zk part includes the protection of identity of users while voting. Identity commitment can reveal public key of the users, but that is not what we are protecting. 

### Actors:
Following are the actors of the system who’ll be performing the actions in the system. Each actor’s scope of access is different and not all actor’s identities are protected through semaphore. 

**Admin**:
Actor is responsible for the following actions:
- Creating organization
- Creating circles
- Adding contributors for whom people can vote for
    - This is same as it is done in coordinape. People can vouch in for people in the discord channel. And from there admin can collect the data and add contributors to the project
    - Contributors public key is the public information in this system
-Adding funds to the contract in order to execute the payment. Let’s say you have 100 DAI in your fund for that circle. Now if one voter is joining that circle so the vote weight will be 100 DAI (Total fund / no of voters = Per voter token allocation to vote)
    - This is because of the fact that when we are working with give tokens, we might have to save the vote count of contributor by mapping the identity commitment to the number of give tokens. And this will reveal the identity of the voter during the process, and we don't want that. 
- Specifying the epoch time
- EPOCHs are started when the circle is created
- Specifying the voter’s incentivization allocation in the token pool (this is 5% for this system)

*ADMIN can be a multisig contract as well.

**Contributor**:
Role of the contributor is as follows:
- Contributors will be added by admin in the circle before the start of epoch
- Contributors will be receiving votes 
- By the end of epoch, contributors can claim those votes on the blockchain and earn DAI or any token 

**Voter**:
User journey of the voter is the main part of the whole application. The journey is as follow:
- Voters must own the NFT of the community to become voter
- The way anyone can become the voter is as follows:
    - Voter first need to select to which circle they'll be voting in
    - Identity of the voters will be made using semaphore. 
    - Identity commitment will be made. Details will be discussed in the Design part of the document
- Voters can vote to the contributors by making voting nullifier of that contributor and circle, and they also need to submit the proof of the identity while voting.
- Upon the finishing of epoch, voter can provide the proof that he has actually voted, he then can claim the NFT back + some incentive token to participate in the voting mechanism

### Design:
Before diving deep into the technical architecture let’s first discuss the public & private parameters of the circuit while building identity commitment and external nullifier for vote.

**Circuit**:
The purpose of the circuits is:
1. To verify the semaphore identity of the user
2. To verify the external nullifer of the vote by proving its existence in the merkle tree

*identity_nullifier.circom*:
- Private parameters
    - Identity nullifier
    - Identity trapdoor
    - Secret 
    - Merkle path
    - Path indices
- Public parameters
    - root

*voting_nullifier.circom* :
- Private parameters:
    - Identity nullifier 
    - Merkle path
    - Path indices
- Public parameters:
    - circle_id
    - pk
    - root

**Contract** :
The purpose of the contract is:
- To create organization in which circles can be added and contributors can be added
- Functionality to submit the voting commitment 
- Handling the voting weight as per the allocated match fund
- To behave as an escrow where people can deposit NFT 
- To make sure voting starts and ends at the right epoch time and ensure the security as well

Some contracts:
1. SPIC
    - This contract uses the base functionality of the SemaphoreVoting contract. It does not implement the functionality exactly. Some changes have been made in the contract to reduce the unnecessary functionality and redundant code. This coding decision is also made in order to provide a simpler contract interface.
2. Token (Mock ERC20 token)
3. NFT (Mock ERC721 token)
4. Verifier contract (groth16 verifier contract)

### System Design:

![System Design](design.png)

**Relayer**:
To send private transactions to the smart contract of voting, and claiming NFT by the voters. Relayers are not decentralized yet, but in future much better design can be implemented to reduce the dependency to execute private transactions. 

**Smart contract**:
As described in above section.

**Indexing**:
For indexing, in the MVP version local storage of the browser will be used to store the state of users and voters. In the extended version, a subgraph can be deployed to listen to the events emitted by the smart contract.

**Circuits**:
As described in above section.

## Out of Scope:
- Resolving off-chain collusion issues
- Resolving the selection of members through vouching process on discord
- There’s a limitation right now on how many members can vote, in future it has to be generalized. Right now the depth of tree is 3 (8 leaves, voting and identity)

## Run Locally

### Clone the Repository

```bash
git clone https://github.com/shakeib98/SPIC.git
```

### Run circuits

To run cicuits, go inside the `circuits` folder:

```bash
cd circuits
```

Then, follow the intructions in the [README file](/circuits/README.md) in the `circuits` folder.

### Run contracts

To run contracts, go inside the `contracts` folder:

```bash
cd contracts
```

Then, follow the intructions in the [README file](/contracts/README.md) in the `contracts` folder.

### Run front-end

To run the frontend, go inside the `front-end` folder:

```bash
cd front-end
```

### Run server

To run the relayer, go inside the `server` folder:

```bash
cd server
```

## License

[MIT](https://choosealicense.com/licenses/mit/)




