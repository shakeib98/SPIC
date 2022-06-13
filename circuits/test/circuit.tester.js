const { expect } = require("chai");
const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);
const buildPoseidon = require("circomlibjs").buildPoseidon;

const assert = chai.assert;

describe("SnakeAndLadder", function () {
    this.timeout(100000000);

    it("Identity Commitment", async () => {
        const poseidonJs = await buildPoseidon();
        const circuit = await wasm_tester("../identity_commitment.circom");

        console.log(circuit)

        // const INPUT =
        // {
        //     "diceTurns": [6,1,1,1,1,3,4,1],
        //     "publicHashSol": poseidonJs.F.toObject(poseidonJs([6,1,1,1,1,3,4,1]))
        // }
        
        // const witness = await circuit.calculateWitness(INPUT, true);
        // console.log(poseidonJs.F.toObject(poseidonJs([6,1,1,1,1,3,4,1])), witness[1])
        // assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        // assert(Fr.eq(Fr.e(witness[1]), poseidonJs.F.toObject(poseidonJs([6,1,1,1,1,3,4,1]))));

    });

    it("Voting Commitment", async () => {
        const poseidonJs = await buildPoseidon();
        const circuit = await wasm_tester("../voting_nullifier.circom");

        console.log(circuit)

        // const INPUT =
        // {
        //     "diceTurns": [6,1,1,1,1,3,4,1],
        //     "publicHashSol": poseidonJs.F.toObject(poseidonJs([6,1,1,1,1,3,4,1]))
        // }
        
        // const witness = await circuit.calculateWitness(INPUT, true);
        // console.log(poseidonJs.F.toObject(poseidonJs([6,1,1,1,1,3,4,1])), witness[1])
        // assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        // assert(Fr.eq(Fr.e(witness[1]), poseidonJs.F.toObject(poseidonJs([6,1,1,1,1,3,4,1]))));

    });
});

