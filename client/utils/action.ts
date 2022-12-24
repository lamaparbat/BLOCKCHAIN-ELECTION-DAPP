import { Http } from "../services/index";

export const registerCandidate = async (data: Object) => {
 try {
  return await Http("post", "/candidate/signup", data);
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

export const registerParty = async (data: Object) => {
 try {
  return await Http("post", "/party/signup", data);
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

