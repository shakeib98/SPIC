import * as mongoose from 'mongoose';

export const CircleSchema = new mongoose.Schema({
  _id: String,
  name: String,
  adminAddress: String,
  organizationName: String,
  erc20Address: String,
  erc20Amount: Number,
  erc721Address: String,
  incentive: Number,
  contributors: [String],
  epochFrom: Date,
  epochTo: Date,
  votesCount: {
    type: Number,
    default: 0,
  },
  voterCount: {
    type: Number,
    default: 0,
  },
});

export interface Circle {
  _id: string;
  name: string;
  adminAddress: string;
  organizationName: string;
  erc20Address: string;
  erc20Amount: number;
  erc721Address: string;
  incentive: number;
  contributors: [string];
  epochFrom: Date;
  epochTo: Date;
  votesCount: number;
  voterCount: number;
}

export const treesSchema = new mongoose.Schema({
  circleID: String,
  IC: {
    type: [String],
    default: [],
  },
  VN: {
    type: [String],
    default: [],
  },
  votesIndex: {
    type: Number,
    default: 0,
  },
  voterIndex: {
    type: Number,
    default: 0,
  },
  indexMapping: Object,
});

export interface Tree {
  circleID: string;
  IC: [string];
  VN: [string];
  votesIndex: number;
  voterIndex: number;
  indexMapping: object;
}
