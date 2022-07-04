import { Injectable } from '@nestjs/common';
import { MerkleTree } from './merkletree';
import { PoseidonHasher } from './poseidonHasher';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildPoseidon = require('circomlibjs').buildPoseidon;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  initializeTree = async () => {
    const poseidonJs = await buildPoseidon();
    const votingTree = new MerkleTree(
      3,
      'Voter Commitment',
      new PoseidonHasher(poseidonJs),
    );
    const identityTree = new MerkleTree(
      3,
      'Voter Identity',
      new PoseidonHasher(poseidonJs),
    );
    return { votingTree, identityTree, voterIndex: 0, votesIndex: 0 };
  };
}
