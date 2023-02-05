import { SmartContract } from "../constants";

export const getCandidateList = async () => {
  return await SmartContract.methods.getAllCandidates().call();
}

export const getVoterList = async () => {
  return await SmartContract.methods.getAllVoters().call();
}

export const getPartyList = async () => {
  return await SmartContract.methods.getAllParties().call();
}
