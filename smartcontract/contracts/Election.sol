// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";

contract Election is Structure{
    using SafeMath for uint;
    address adminAddress;
    
    constructor(){
        adminAddress = msg.sender;
    }
    
    // Mapping 
    mapping (address => Candidate) public candidates;
    mapping (address => Voter) public voters;
    mapping (address => Party) public parties;
    mapping (string => Election) public elections;
    mapping (address => FAQ) public faqs;

    // Arrays
    Candidate[] public candidateList;
    Voter[] public voterList;
    Party[] public partyList;
    Election[] public electionList;
    FAQ[] public faqList;
    string[] public candidateNames;
    string[] public voterNames;
    string[] public partyNames;



    // static variables
    uint public totalCandidate = 0;
    uint public totalVoter = 0;
    uint public totalParty = 0;
    uint public totalElection = 0;
    uint public voteCount = 0;

    // Event
    event PartyCreated(Party party);
    event CandidateCreated(Candidate candidate);
    event VoterCreated(Voter voter);
    event VoteCast(Candidate candidate);
    event electionStart(Election election);
    event NewFaqAdded(FAQ faq);
    
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

    // setter functions
    function addParty(string memory _name, uint _totalMember, string memory _agenda, string memory _logoUrl) public payable {
        if(msg.sender != adminAddress){
            revert("Only admin is allow to add Party !");
        }

        address[] memory emptyArray;
        Party memory party = Party(adminAddress, _name, _totalMember, _agenda, _logoUrl, emptyArray);
        
        parties[adminAddress] = party;
        partyNames.push(_name);
        partyList.push(party);
        totalParty = totalParty.add(1);

        emit PartyCreated(party);
    }

    function addCandidate(string memory _name, uint _citizenshipNo, uint _age, string memory _agenda, string memory _dob,
        string memory _email, string memory _profile, string memory _partyName, string memory _province, string memory _district, 
        string memory _municipality, string memory _ward
    ) public payable {
        address[] memory votedVoterLists;
        address _id = msg.sender;

        // verify voter if already exist
        if(candidates[_id].user.citizenshipNumber != 0){
            revert("Candidate already registered !");
        }

        Candidate memory candidate = Candidate(
            User(_id, _name, _citizenshipNo, _age, _dob, _email, _profile, _province, _district, _municipality, _ward),
             _partyName, _agenda, 0, votedVoterLists
        );

        candidates[_id] = candidate;
        candidateNames.push(_name);
        candidateList.push(candidate);
        totalVoter = totalVoter.add(1);

        emit CandidateCreated(candidate);
    }

    function addVoter(string memory _name, uint _citizenshipNo, uint _age, string memory _dob,
        string memory _email, string memory _profile,string memory _province,
        string memory _district, string memory _municipality, string memory _ward
    ) public payable {
        address _id = msg.sender;

        // verify voter if already exist
        if(voters[_id].user.citizenshipNumber != 0){
            revert("Voter already registered !");
        }
        
        address[] memory votedCandidateList;
        Voter memory voter = Voter(
            User(_id, _name, _citizenshipNo, _age, _dob, _email, _profile, _province, _district, _municipality, _ward), 
            votedCandidateList, 0
        );
        
        voters[_id] = voter;
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
    ) public payable{
        if(msg.sender != adminAddress){
            revert("Only admin is allow to create election !");
        }

        address[] memory selectedCandidates;
        Election memory election = Election(_title, _description, _startDate, _endDate, _electionType, selectedCandidates);

        elections[_startDate] = election;
        electionList.push(election);
        totalElection = totalElection.add(1);

        emit electionStart(election);
    }

    function addSelectedCandidates(
        address[] memory _selectedCandidates,
        string memory electionAddress
    ) public payable{
        if(msg.sender != adminAddress){
            revert("Only admin is allow to select candidates !");
        }

        for (uint i = 0; i < _selectedCandidates.length; i++) {
            elections[electionAddress].selectedCandidates.push(_selectedCandidates[i]);
        }

        for(uint i = 0; i < electionList.length; i++){
            if(keccak256(bytes(electionList[i].startDate)) == keccak256(bytes(electionAddress))){
                for (uint j = 0; j < _selectedCandidates.length; j++) {
                    electionList[i].selectedCandidates.push(_selectedCandidates[j]);
                }
                break;
            }
        }
    }

    function addFaqs(string memory title, string memory description, string memory fileUrl, string memory createdAt) public payable {
        address _id = msg.sender;
        ReplyComment[] memory replies;

        FAQ memory faq = FAQ(_id, title, description, fileUrl, createdAt, replies);
        faqs[_id] =faq;
        faqList.push(faq);
    }

    function addFaqComment(address faqId, string memory replyMsg, string memory createdAt) public payable {
        address _id = msg.sender;
        ReplyComment memory reply = ReplyComment(_id, replyMsg, createdAt);

        faqs[faqId].comments.push(reply);

        for(uint i=0;i<faqList.length;i++){
            if(faqList[i]._id == faqId){
                faqList[i].comments.push(reply);
                break;
            }
        }
    }


    // getter functions
    function getAllParties() public view returns (Party[] memory){
        return partyList;
    }

    function getAllCandidates() public view returns (Candidate[] memory){
        return candidateList;
    }

    function getAllVoters() public view returns (Voter[] memory){
        return voterList;
    }

    function getAllElections() public view returns (Election[] memory){
        return electionList;
    }

    function getPartyDetails(address owner) public view returns(Party memory){
        return parties[owner];
    }

    function getCandidateDetails(address _id) public view returns(Candidate memory){
        return candidates[_id];
    }

    function getVoterDetails(address _id) public view returns(Voter memory){
        return voters[_id];
    }

    function getAllFAQs() public view returns (FAQ[] memory) {
        return faqList;
    }
}




// test data
// Parbat, 0778, 22, wanna make secure system, sep 12 2022, kathamandu nepal, parbat@gmail.com, http://profile.com, Congress
// Gaurab, 0778, 22, oct 11 2022, garuab@gmail.com, http://profile.com, madhesh ,sarlahi,barahathawa, 9 


// create election
// Election 2022, hello world election, sep 12 2022 , sep 13 2022, province

// add faq & reply
// UI design issues, please maintain your desing, https://file.png, 2023-23-23T1-23-12
// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, yes it caused problem, 2023-34-23T2-34-23
