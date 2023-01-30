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

    // register a candidate
    function registerCandidate(
        string memory _name, uint _citizenshipNo, uint _age, string memory _agenda, string memory _dob,
        string memory _address,  string memory _email, string memory _profile, string memory _partyName
    ) private {
        election.addCandidate(_name, _citizenshipNo, _age, _agenda, _dob, _address,  _email, _profile, _partyName);
    }

    // register a voter
    function registerVoter(
        string memory _name, uint _citizenship_no, uint _age, string memory _agenda, string memory _dob,
        string memory _address,  string memory _email, string memory _profile
    ) private {
        election.addVoter(_name, _citizenship_no, _age, _agenda, _dob, _address,  _email, _profile);
    }
}