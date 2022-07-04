import { BigNumber, ethers } from 'ethers';
import { poseidonHash } from '../util';

export class Identity {
  private constructor(
    public readonly nullifier: string,
    public readonly trapdoor: string,
    public readonly secret: string,
    public poseidon: any
  ) {
    this.nullifier = nullifier;
    this.poseidon = poseidon;
    this.trapdoor = trapdoor;
    this.secret = secret;
  }

  static new(nullifier: string, trapdoor: string, secret: string, poseidon: any) {
    console.log("inside identity ---",nullifier, trapdoor, secret ,poseidon)
    return new this(nullifier, trapdoor, secret ,poseidon);
  }

  get commitment(): string {
    // @ts-ignore
    return this.poseidon.F.toObject(this.poseidon([this.nullifier, this.trapdoor, this.secret]));
  }

  get getParameters(): Object {
    return {
      nullifier: this.nullifier,
      trapdoor: this.trapdoor,
      secret: this.secret
    }
  }

//   get nullifierHash() {
//     return poseidonHash(this.poseidon, [this.nullifier, 17]);
//   }
}
