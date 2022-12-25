import { Http } from "../services/index";

// candidate || party
export const registerCandidate = async (payload: Object) => {
 try {
  return await Http("post", "/candidate/signup", payload);
 } catch (error) {
  return console.error(error);
 }
}

export const getCandidateLists = async ({ skip }) => {
 try {
  const url = `/candidate/lists?skip=${skip}`;
  const res = await Http("get", url, null);
  return res;
 } catch (error) {
  return console.error(error);
 }
}

export const registerParty = async (payload: Object) => {
 try {
  return await Http("post", "/party/signup", payload);
 } catch (error) {
  return console.error(error);
 }
}

export const getPartyLists = async ({ skip }) => {
 try {
  const url = `/party/lists?skip=${skip}`;
  const res = await Http("get", url, null);
  return res;
 } catch (error) {
  return console.error(error);
 }
}


// Voter
export const registerVoter = async (payload: Object) => {
 try {
  return await Http("post", "/voter/signup", payload);
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




// Create a new election
export const createElection = async (payload: Object) => {
 try {
  return await Http("post", "/admin/createElection", payload);
 } catch (error) {
  return console.error(error);
 }
}
