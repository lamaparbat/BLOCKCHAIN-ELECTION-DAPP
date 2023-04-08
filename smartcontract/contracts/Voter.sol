// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";
import "./Candidate.sol";
import "./Auth.sol";

contract Voter is Structure, Candidate, Auth{
    using SafeMath for uint;

    // Mapping 
    mapping (address => Voter) public voters;

    // Arrays
    Voter[] public voterList;
    string[] public voterNames;

    // counter varirables
    uint public totalVoter = 0;
    uint public voteCount = 0;

    // Event abstractions
    event VoteCast(Candidate candidate);
    
    // updators
    function vote(address _candidateId) public payable{
        address _voterId = msg.sender;

        // restrict admin for vote casting
        if(_voterId == adminAddress){
            revert("Admin is restrict to caste vote.");
        }

        // verify vote limit count
        if(voters[_voterId].voteLimitCount > 3){
            revert("You have exceed the vote caste limit.");
        }

        candidates[_candidateId].votedVoterLists.push(_voterId);
        voters[_voterId].votedCandidateList.push(_candidateId);
        candidates[_candidateId].voteCount = candidates[_candidateId].voteCount.add(1);
        voteCount = voteCount.add(1); 

        for(uint i=0;i<candidateList.length;i++){
            if(candidateList[i].user._id == _candidateId){
                candidateList[i].votedVoterLists.push(_voterId);
            }
        }

        for(uint i=0;i<voterList.length;i++){
            if(voterList[i].user._id == _voterId){
                voterList[i].votedCandidateList.push(_candidateId);
            }
        }

        voters[_voterId].voteLimitCount = voters[_voterId].voteLimitCount.add(1);
        

        emit VoteCast(candidates[_candidateId]);
    }

    function getAllVoters() public view returns (Voter[] memory){
        return voterList;
    }

    function getVoterDetails(address _id) public view returns(Voter memory){
        return voters[_id];
    }
}
