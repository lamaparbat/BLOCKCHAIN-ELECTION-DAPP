// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "./Election.sol";

// Candidate contract
contract Candidate is Election {
    // The Election contract instance
    Election public election;

    // Constructor to set the Election contract instance
    constructor(address electionAddress){
        election = Election(electionAddress);
    }

    // Function to get the candidate's vote count
    function getVoteCount(string memory name) public view returns (uint) {
        Candidate memory candidate = getCandidateDetails(name);
        return candidate.voteCount;
    }
}