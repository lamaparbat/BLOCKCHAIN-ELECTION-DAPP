import { SmartContract } from "../constants";
import Web3 from "web3";

const web3: any = new Web3(Web3.givenProvider);
declare const window: any;

export const disconnectWallet = async () => {
  await web3?.ethereum.disconnect();
}

export const getCandidateList = async () => {
  if (!window.ethereum) return [];
  return await SmartContract.methods.getAllCandidates().call();
}

export const getVoterList = async () => {
  if (!window.ethereum) return [];
  return await SmartContract.methods.getAllVoters().call();
}

export const getPartyList = async () => {
  if (!window.ethereum) return [];
  return await SmartContract.methods.getAllParties().call();
}

export const getElectionList = async () => {
  if (!window.ethereum) return [];
  return await SmartContract.methods.getAllElections().call();
}

export const getFaqs = async () => {
  if (!window.ethereum) return [];
  return await SmartContract.methods.getAllFAQs().call();
}