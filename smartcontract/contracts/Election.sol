// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./SafeMath.sol";
import "./Structure.sol";

contract Election is Structure {
    using SafeMath for uint256;

    // Mapping
    mapping(string => Candidate) public candidates;
    mapping(string => Voter) public voters;
    mapping(string => Party) public parties;

    // Arrays
    Candidate[] public candidateList;
    Voter[] public voterList;
    Party[] public partyList;
    string[] public candidateNames;
    string[] public voterNames;
    string[] public partyNames;

    // static variables
    uint256 public totalCandidate = 0;
    uint256 public totalVoter = 0;
    uint256 public totalParty = 0;
    uint256 public voteCount = 0;

    // Event
    event PartyCreated(Party party);
    event CandidateCreated(Candidate candidate);
    event VoterCreated(Voter voter);
    event VoteCast(string candidateName);

    // updators
    function vote(string memory candidateName) public {
        candidates[candidateName].voteCount = candidates[candidateName]
            .voteCount
            .add(1);
        voteCount = voteCount.add(1);

        emit VoteCast(candidateName);
    }

    // setter functions
    function addParty(
        string memory _name,
        uint256 _totalMember,
        string memory _agenda,
        string memory _logoUrl
    ) public payable {
        string[] memory emptyArray;
        Party memory party = Party(
            _name,
            _totalMember,
            _agenda,
            _logoUrl,
            emptyArray
        );

        parties[_name] = party;
        partyNames.push(_name);
        partyList.push(party);
        totalParty = totalParty.add(1);

        emit PartyCreated(party);
    }

    function addCandidate(
        string memory _name,
        uint256 _citizenshipNo,
        uint256 _age,
        string memory _agenda,
        string memory _dob,
        string memory _email,
        string memory _profile,
        string memory _partyName,
        string memory _province,
        string memory _district,
        string memory _municipality,
        string memory _ward
    ) public payable {
        Candidate memory candidate = Candidate(
            User(
                _name,
                _citizenshipNo,
                _age,
                _dob,
                _email,
                _profile,
                _province,
                _district,
                _municipality,
                _ward
            ),
            _agenda,
            _partyName,
            0
        );

        candidates[_name] = candidate;
        candidateNames.push(_name);
        candidateList.push(candidate);
        totalVoter = totalVoter.add(1);

        emit CandidateCreated(candidate);
    }

    function addVoter(
        string memory _name,
        uint256 _citizenshipNo,
        uint256 _age,
        string memory _dob,
        string memory _email,
        string memory _profile,
        string memory _province,
        string memory _district,
        string memory _municipality,
        string memory _ward
    ) public payable {
        Voter memory voter = Voter(
            User(
                _name,
                _citizenshipNo,
                _age,
                _dob,
                _email,
                _profile,
                _province,
                _district,
                _municipality,
                _ward
            ),
            false
        );

        voters[_name] = voter;
        voterNames.push(_name);
        voterList.push(voter);
        totalVoter = totalVoter.add(1);

        emit VoterCreated(voter);
    }

    // getter functions
    function getAllParties() public view returns (Party[] memory) {
        return partyList;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidateList;
    }

    function getAllVoters() public view returns (Voter[] memory) {
        return voterList;
    }

    function getPartyDetails(string memory name)
        public
        view
        returns (Party memory)
    {
        return parties[name];
    }

    function getCandidateDetails(string memory name)
        public
        view
        returns (Candidate memory)
    {
        return candidates[name];
    }

    function getVoterDetails(string memory name)
        public
        view
        returns (Voter memory)
    {
        return voters[name];
    }
}

// test data
// Parbat, 0778, 22, wanna make secure system, sep 12 2022, kathamandu nepal, parbat@gmail.com, http://profile.com, Congress
// Gaurab, 0778, 22, oct 11 2022, Pokhara nepal, garuab@gmail.com, http://profile.com
