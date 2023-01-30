// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";

contract Election is Structure{
    using SafeMath for uint;
    
    // Struct

    // Mapping 
    mapping (string => Candidate) public candidates;
    mapping (string => Voter) public voters;

    // Arrays
    string[] public candidateNames;
    string[] public voterNames;


    // static variables
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
    function addCandidate(string memory _name, uint _citizenship_no, uint _age, string memory _agenda, string memory _dob,
        string memory _address,  string memory _email, string memory _profile) public {

        candidates[_name] = Candidate({
            name: _name,
            citizenship_no:_citizenship_no,
            age:_age,
            agenda:_agenda,
            dob:_dob,
            address_name:_address,
            email:_email,
            profile:_profile,
            voteCount: 0
        });
        candidateNames.push(_name);
    }

    function addVoter(string memory _name, uint _citizenship_no, uint _age, string memory _agenda, string memory _dob,
        string memory _address,  string memory _email, string memory _profile) public {
        voters[_name] = Voter({
            name: _name,
            citizenship_no:_citizenship_no,
            age:_age,
            agenda:_agenda,
            dob:_dob,
            address_name:_address,
            email:_email,
            profile:_profile,
            voted: false
        });
        voterNames.push(_name);
    }




    // getter functions
    function getCandidateDetails(string memory name) public view returns(Candidate memory){
        return candidates[name];
    }
    function getVoterDetails(string memory name) public view returns(Voter memory){
        return voters[name];
    }
}