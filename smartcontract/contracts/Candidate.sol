// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "../common/Structure.sol";
import "../common/Utils.sol";

contract Candidate is Structure, Utils{
    using SafeMath for uint;

    // Mapping 
    mapping (address => Candidate) public candidates;

    // Arrays
    Candidate[] public candidateList;
    string[] public candidateNames;

    // counter varirables
    uint public totalCandidate = 0;

    event CandidateCreated(Candidate candidate);

    function addCandidate(string memory _name, uint _citizenshipNo, uint _age, string memory _agenda, string memory _dob,
        string memory _email, string memory _profile, string memory _partyName, string memory _province, string memory _district, 
        string memory _municipality, string memory _ward, string memory _gender
    ) public payable {
        address[] memory votedVoterLists;
        address _id = msg.sender;

        // verify voter if already exist
        require(candidates[_id].user._id != _id, "Candidate already registered !");

        // verify email duplication in candidate list
        for(uint i=0;i<candidateList.length;i++){
            require(candidateList[i].user.citizenshipNumber != _citizenshipNo, "Candidate with given Citizenship No. already registered !");
            require( keccak256(bytes(candidateList[i].user.email)) != keccak256(bytes(_email)), "Candidate with given email already registered !");
        }

        updateCounter(_gender);

        Candidate memory candidate = Candidate(
            User(_id, _name, _citizenshipNo, _age, _gender, _dob, _email, _profile, _province, _district, _municipality, _ward),
             _partyName, "", _agenda, 0, votedVoterLists
        );

        candidates[_id] = candidate;
        candidateNames.push(_name);
        candidateList.push(candidate);
        totalCandidate = totalCandidate.add(1);

        emit CandidateCreated(candidate);
    }

    function getAllCandidates() public view returns (Candidate[] memory){
        return candidateList;
    }

    function getCandidateDetails(address _id) public view returns(Candidate memory){
        return candidates[_id];
    }
}

