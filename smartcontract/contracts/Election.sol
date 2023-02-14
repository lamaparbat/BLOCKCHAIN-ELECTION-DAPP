// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";

contract Election is Structure {
    using SafeMath for uint256;

    // Mapping
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => Voter) public voters;
    mapping(string => Party) public parties;
    mapping(string => Election) public elections;

    // Arrays
    Candidate[] public candidateList;
    Voter[] public voterList;
    Party[] public partyList;
    Election[] public electionList;
    string[] public candidateNames;
    string[] public voterNames;
    string[] public partyNames;

    // static variables
    uint256 public totalCandidate = 0;
    uint256 public totalVoter = 0;
    uint256 public totalParty = 0;
    uint256 public totalElection = 0;
    uint256 public voteCount = 0;

    // Event
    event PartyCreated(Party party);
    event CandidateCreated(Candidate candidate);
    event VoterCreated(Voter voter);
    event VoteCast(Candidate candidate);
    event electionStart(Election election);

    // updators
    function vote(uint256 _citizenshipNo) public {
        candidateList[_citizenshipNo];
        candidates[_citizenshipNo].voteCount = candidates[_citizenshipNo]
            .voteCount
            .add(1);
        voteCount = voteCount.add(1);

        emit VoteCast(candidates[_citizenshipNo]);
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
            _partyName,
            _agenda,
            0
        );

        candidates[_citizenshipNo] = candidate;
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

        voters[_citizenshipNo] = voter;
        voterNames.push(_name);
        voterList.push(voter);
        totalVoter = totalVoter.add(1);

        emit VoterCreated(voter);
    }

    function createElection(
        string memory _title,
        string memory _description,
        string memory _startDate,
        string memory _endDate,
        string memory _electionType
    ) public payable {
        Candidate[] memory selectedCandidates;
        Election memory election = Election(
            _title,
            _description,
            _startDate,
            _endDate,
            _electionType,
            selectedCandidates
        );

        elections[_startDate] = election;
        electionList.push(election);
        totalElection = totalElection.add(1);

        emit electionStart(election);
    }

    function addSelectedCandidates(
        Candidate[] memory _selectedCandidates,
        string memory electionAddress
    ) public payable {
        for (uint256 i = 0; i < _selectedCandidates.length; i++) {
            elections[electionAddress].selectedCandidates.push(
                _selectedCandidates[i]
            );
        }

        for (uint256 i = 0; i < electionList.length; i++) {
            if (
                keccak256(bytes(electionList[i].startDate)) ==
                keccak256(bytes(electionAddress))
            ) {
                for (uint256 j = 0; j < _selectedCandidates.length; j++) {
                    electionList[i].selectedCandidates.push(
                        _selectedCandidates[j]
                    );
                }
                break;
            }
        }
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

    function getAllElections() public view returns (Election[] memory) {
        return electionList;
    }

    function getPartyDetails(string memory name)
        public
        view
        returns (Party memory)
    {
        return parties[name];
    }

    function getCandidateDetails(uint256 _citizenshipNo)
        public
        view
        returns (Candidate memory)
    {
        return candidates[_citizenshipNo];
    }

    function getVoterDetails(uint256 _citizenshipNo)
        public
        view
        returns (Voter memory)
    {
        return voters[_citizenshipNo];
    }
}

// test data
// Parbat, 0778, 22, wanna make secure system, sep 12 2022, kathamandu nepal, parbat@gmail.com, http://profile.com, Congress
// Gaurab, 0778, 22, oct 11 2022, Pokhara nepal, garuab@gmail.com, http://profile.com

// create election
// Election 2022, hello world election, sep 12 2022 , sep 13 2022, province
