import { getConvertedAge } from "./ageCalculator";
import { getEventDate } from "./getEventDate";
import {
  registerCandidate,
  registerParty,
  registerVoter
} from "./action";
import { getCandidateList, getVoterList, getPartyList, getElectionList, disconnectWallet } from "./web3";
import { getFormattedErrorMessage, getElectionStatus, trimAddress } from "./common";

export {
  getConvertedAge,
  getEventDate,
  registerCandidate,
  registerParty,
  registerVoter,
  getCandidateList, getVoterList, getPartyList, getElectionList, disconnectWallet,
  getFormattedErrorMessage, trimAddress,
  getElectionStatus
}
