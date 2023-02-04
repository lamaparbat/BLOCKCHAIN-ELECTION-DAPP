import { SmartContract } from "../constants";

export const getCandidateList = async () => {
  return await SmartContract.methods.getAllCandidates().call();
}