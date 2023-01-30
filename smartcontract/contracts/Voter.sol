// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "./Election.sol";

// Voter contract
contract Voter is Election{
    // The Election contract instance
    Election public election;

    // Constructor to set the Election contract instance
    constructor(address electionAddress) {
        election = Election(electionAddress);
    }

    // Function to cast a vote
    function Vote(string memory candidateName) public {
        // Call the vote function on the Election contract
        election.vote(candidateName);
    }
}