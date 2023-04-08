// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./Structure.sol";
import "./Constants.sol";

contract Candidate is Structure, Constants{
    // Mapping 
    mapping (address => Candidate) public candidates;

    // Arrays
    Candidate[] public candidateList;
    string[] public candidateNames;


    function getAllCandidates() public view returns (Candidate[] memory){
        return candidateList;
    }

    function getCandidateDetails(address _id) public view returns(Candidate memory){
        return candidates[_id];
    }
}

