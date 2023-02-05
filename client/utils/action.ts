import { Http } from "../services/index";

// candidate || party
const registerCandidate = async (payload: Object) => {
  try {
    const response = await Http("post", "/candidate/signup", payload);
    return response?.data?.data;
  } catch (error) {
    return console.error(error);
  }
}

const getCandidateLists = async ({ skip }) => {
  try {
    const url = `/candidate/lists?skip=${skip}`;
    const res = await Http("get", url, null);
    return res;
  } catch (error) {
    return console.error(error);
  }
}

const registerParty = async (payload: Object) => {
  try {
    return await Http("post", "/party/signup", payload);
  } catch (error) {
    return console.error(error);
  }
}

const getPartyLists = async ({ skip }) => {
  try {
    const url = `/party/lists?skip=${skip}`;
    const res = await Http("get", url, null);
    return res;
  } catch (error) {
    return console.error(error);
  }
}


// Voter
const registerVoter = async (payload: Object) => {
  try {
    const response = await Http("post", "/voter/signup", payload);
    return response?.data?.data;
  } catch (error) {
    return console.error(error);
  }
}

const getVoterLists = async ({ skip }) => {
  try {
    const url = `/voter/lists?skip=${skip}`;
    const res = await Http("get", url, null);
    return res;
  } catch (error) {
    return console.error(error);
  }
}


// Create a new election
const createElection = async (payload: Object) => {
  try {
    return await Http("post", "/admin/createElection", payload);
  } catch (error) {
    return console.error(error);
  }
}


export {
  registerCandidate,
  registerParty,
  registerVoter,
  createElection
}
