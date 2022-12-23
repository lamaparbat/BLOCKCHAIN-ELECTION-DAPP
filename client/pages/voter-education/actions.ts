import { Http } from "../../services";

export const registerVoter = async (data: Object) => {
 try {
  return await Http("post", "/voter/signup", data);
 } catch (error) {
  return console.error(error);
 }
}

export const getVoterLists = async ({ skip }) => {
 try {
  const url = `/voter/lists?skip=${skip}`;
  const res = await Http("get", url, null);
  return res;
 } catch (error) {
  return console.error(error);
 }
}