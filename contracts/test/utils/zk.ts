import { BigNumber, BigNumberish, ethers } from "ethers";
// @ts-ignore
import { groth16 } from "snarkjs";
import path from "path";
interface Proof {
  a: [BigNumberish, BigNumberish];
  b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];
  c: [BigNumberish, BigNumberish];
}

// export const unstringifyBigInts = (o:any) => {
//   if (typeof o == "string" && /^[0-9]+$/.test(o)) {
//     return bigInt(o);
//   } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
//     return bigInt(o);
//   } else if (Array.isArray(o)) {
//     return o.map(unstringifyBigInts);
//   } else if (typeof o == "object") {
//     if (o === null) return null;
//     const res = {};
//     const keys = Object.keys(o);
//     keys.forEach((k) => {
//       res[k] = unstringifyBigInts(o[k]);
//     });
//     return res;
//   } else {
//     return o;
//   }
// };

export const poseidonHash = (poseidon: any, inputs: BigNumberish[]): string => {
  const hash = poseidon(inputs.map((x) => BigNumber.from(x).toBigInt()));
  // Make the number within the field size
  const hashStr = poseidon.F.toString(hash);
  // Make it a valid hex string
  const hashHex = BigNumber.from(hashStr).toHexString();
  // pad zero to make it 32 bytes, so that the output can be taken as a bytes32 contract argument
  const bytes32 = ethers.utils.hexZeroPad(hashHex, 32);
  return bytes32;
};

export const toFixedHex = (number: any, length = 32) => {
  // eslint-disable-next-line node/no-unsupported-features/es-builtins
  let str = BigInt(number).toString(16);
  while (str.length < length * 2) str = "0" + str;
  str = "0x" + str;
  return str;
};

export const prove = async (witness: any): Promise<Proof> => {
  const wasmPath = path.join(
    __dirname,
    "../circuits/build/withdraw_js/withdraw.wasm"
  );
  const zkeyPath = path.join(__dirname, "../circuits/build/circuit_final.zkey");
  console.log({ wasmPath, witness });

  const { proof } = await groth16.fullProve(witness, wasmPath, zkeyPath);
  console.log(proof);
  const solProof: Proof = {
    a: [proof.pi_a[0], proof.pi_a[1]],
    b: [
      [proof.pi_b[0][1], proof.pi_b[0][0]],
      [proof.pi_b[1][1], proof.pi_b[1][0]],
    ],
    c: [proof.pi_c[0], proof.pi_c[1]],
  };
  return solProof;
};