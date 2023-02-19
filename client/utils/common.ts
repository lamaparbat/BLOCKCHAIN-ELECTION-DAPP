import _ from "lodash";
import moment from "moment";
import { ElectionStruct } from "../interfaces";

export const getFormattedErrorMessage = (msgObject:string) => {
  if(!msgObject) return "";

  const arr = msgObject?.split("{");
  let formattedMsg:any = _.find(arr, (str) => str.includes("message"));
  formattedMsg = formattedMsg?.split(":");
  formattedMsg = formattedMsg?.length > 0 ? formattedMsg[2]?.split("!")[0] : "";
  formattedMsg = formattedMsg?.split("revert")[1];

  return formattedMsg ?? "";
}

export const getElectionStatus = (electionArray:Array<ElectionStruct>): string => {
  const currentElection = electionArray.at(-1);

  // if(!currentElection) return "No election found !";

  const current_date = moment(Date.now());
  const startDate = moment(currentElection?.startDate);
  const endDate = moment(currentElection?.endDate);

  if(current_date >= startDate && current_date <= endDate) return "LIVE";

  if(current_date >= startDate && current_date <= endDate) return "LIVE";

  return "No election available !";
}