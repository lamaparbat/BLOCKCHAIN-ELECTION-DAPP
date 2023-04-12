import _ from "lodash";
import moment from "moment";
import { ElectionStruct } from "../interfaces";

export const getFormattedErrorMessage = (msgObject: string) => {
  if (!msgObject) return "";

  const arr = msgObject?.split("{");
  let formattedMsg: any = _.find(arr, (str) => str.includes("message"));
  formattedMsg = formattedMsg?.split(":");
  formattedMsg = formattedMsg?.length > 0 ? formattedMsg[2]?.split("!")[0] : "";
  formattedMsg = formattedMsg?.split("revert")[1];

  return formattedMsg ?? "";
}

export const getElectionStatus = (electionType: string, electionArray: Array<ElectionStruct>): string => {
  const currentElection = electionArray.at(-1);

  if (currentElection?.electionType !== electionType) return "No election available !";

  const current_date = moment(Date.now());
  const startDate = moment(currentElection?.startDate);
  const endDate = moment(currentElection?.endDate);

  if (current_date >= startDate && current_date <= endDate) return "LIVE";

  if (current_date >= startDate && current_date > endDate) return "ENDED";

  return "No election available !";
}

export const trimAddress = (address: string): string => {
  let trimmedAddr = address.trim() ?? "";
  trimmedAddr = trimmedAddr.substr(0, 8).concat(`...${trimmedAddr.substr(trimmedAddr.length - 8, address.length)}`);

  return trimmedAddr;
}

export const getPartyListOptions = (partyList: Array<any>) => {
  const filter = partyList?.map((d) => {
    return { label: d.name, value: d.name }
  })
  return filter;
};


export const getSortedCandidatesList = (electionList: Array<any>, candidateLists: Array<any>) => {
  const filteredElectionsList = _.map(electionList, (election: any, i: number) => {
    if (electionList.length - 1 !== i) return;
    const allSelectedCandidates = _.filter(candidateLists, (candidate: any) => {
      return _.find(election.candidates, (d) => d.user._id === candidate?.user?._id);
    })
    return { ...election, candidates: allSelectedCandidates }
  });
console.log(filteredElectionsList)
  const currentElection = filteredElectionsList?.length > 0 && filteredElectionsList?.at(-1);
  const electionCandidates = currentElection ? _.groupBy(currentElection?.candidates, (candidate) => candidate.user.province) : [];
  const electionCandidatesArray = electionCandidates ? Object.entries(electionCandidates) : [];

  return { currentElection, electionCandidatesArray };
}

export const getCurrentElection = (electionArray: Array<ElectionStruct>): object => {
  if(!electionArray?.length) return null;

  const currentElection = electionArray?.at(-1);
  const current_date = moment(Date.now());
  const election_start_date = moment(currentElection.startDate);

  if(current_date.isAfter(election_start_date)) return null;

  return currentElection;
}
