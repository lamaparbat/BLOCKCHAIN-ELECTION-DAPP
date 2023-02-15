import _ from "lodash";

export const getFormattedErrorMessage = (msgObject:string) => {
  if(!msgObject) return "";

  const arr = msgObject.split("{");
  let formattedMsg:any = _.find(arr, (str) => str.includes("message"));
  formattedMsg = formattedMsg.split(":");
  formattedMsg = formattedMsg[2].split("!")[0];
  formattedMsg = formattedMsg.split("revert")[1];

  return formattedMsg;
}