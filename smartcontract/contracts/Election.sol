// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";

contract Election is Structure {
    using SafeMath for uint256;

    // Mapping
    mapping(string => Candidate) public candidates;
    mapping(string => Voter) public voters;

    // Arrays
    Candidate[] public candidateList;
    Voter[] public voterList;
    string[] public candidateNames;
    string[] public voterNames;

    // static variables
    uint256 public totalCandidate = 0;
    uint256 public totalVoter = 0;
    uint256 public voteCount;

    // Event
    event VoteCast(string candidateName);

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    // updators
    function vote(string memory candidateName) public {
        candidates[candidateName].voteCount = candidates[candidateName]
            .voteCount
            .add(1);
        voteCount = voteCount.add(1);

        emit VoteCast(candidateName);
    }

    // setter functions
    function addCandidate(
        string memory _name,
        uint256 _citizenshipNo,
        uint256 _age,
        string memory _agenda,
        string memory _dob,
        string memory _address,
        string memory _email,
        string memory _profile,
        string memory _partyName
    ) public payable {
        Candidate memory candidate = Candidate({
            name: _name,
            citizenshipNo: _citizenshipNo,
            age: _age,
            agenda: _agenda,
            dob: _dob,
            address_name: _address,
            email: _email,
            profile: _profile,
            partyName: _partyName,
            voteCount: 0
        });

        candidates[_name] = candidate;
        candidateNames.push(_name);
        candidateList.push(candidate);
        totalVoter = totalVoter.add(1);
    }

    function addVoter(
        string memory _name,
        uint256 _citizenshipNo,
        uint256 _age,
        string memory _dob,
        string memory _address,
        string memory _email,
        string memory _profile
    ) public payable {
        Voter memory voter = Voter({
            name: _name,
            citizenshipNo: _citizenshipNo,
            age: _age,
            dob: _dob,
            address_name: _address,
            email: _email,
            profile: _profile,
            voted: false
        });

        voters[_name] = voter;
        voterNames.push(_name);
        voterList.push(voter);
        totalVoter = totalVoter.add(1);
    }

    // getter functions
    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidateList;
    }

    function getAllVoters() public view returns (Voter[] memory) {
        return voterList;
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
