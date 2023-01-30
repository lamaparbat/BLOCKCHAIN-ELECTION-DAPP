// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";

contract Election is Structure{
    using SafeMath for uint;
    
    // Mapping 
    mapping (string => Candidate) public candidates;
    mapping (string => Voter) public voters;

    // Arrays
    Candidate[] public candidateList;
    Voter[] public voterList;
    string[] public candidateNames;
    string[] public voterNames;



    // static variables
    uint public totalCandidate = 0;
    uint public totalVoter = 0;
    uint public voteCount;

    // Event
    event VoteCast(string candidateName);


    // updators
    function vote(string memory candidateName) public {
        candidates[candidateName].voteCount = candidates[candidateName].voteCount.add(1);
        voteCount = voteCount.add(1);

        emit VoteCast(candidateName);
    }

    

    // setter functions
    function addCandidate(string memory _name, uint _citizenshipNo, uint _age, string memory _agenda, string memory _dob,
        string memory _address,  string memory _email, string memory _profile, string memory _partyName) public {
        Candidate memory candidate = Candidate({
            name: _name,
            citizenshipNo:_citizenshipNo,
            age:_age,
            agenda:_agenda,
            dob:_dob,
            address_name:_address,
            email:_email,
            profile:_profile,
            partyName:_partyName,
            voteCount: 0
        });

        candidates[_name] = candidate;
        candidateNames.push(_name);
        candidateList[totalCandidate] = candidate;

        totalCandidate = totalCandidate.add(1);
    }

    function addVoter(string memory _name, uint _citizenshipNo, uint _age, string memory _agenda, string memory _dob,
        string memory _address,  string memory _email, string memory _profile) public {
        Voter memory voter = Voter({
            name: _name,
            citizenshipNo:_citizenshipNo,
            age:_age,
            agenda:_agenda,
            dob:_dob,
            address_name:_address,
            email:_email,
            profile:_profile,
            voted: false
        });
        voters[_name] = voter;
        voterNames.push(_name);
        voterList[totalVoter] = voter;

        totalVoter = totalVoter.add(1);
    }



    // getter functions
    function getAllCandidates() public view returns (Candidate[] memory){
        return candidateList;
    }

    function getAllVoters() public view returns (Voter[] memory){
        return voterList;
    }

    function getCandidateDetails(string memory name) public view returns(Candidate memory){
        return candidates[name];
    }

    function getVoterDetails(string memory name) public view returns(Voter memory){
        return voters[name];
    }
}