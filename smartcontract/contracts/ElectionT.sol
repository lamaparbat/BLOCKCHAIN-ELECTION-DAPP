// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";
import "./Constants.sol";
import "./Candidate.sol";
import "./Voter.sol";

contract Election is Structure, Constants, Candidate, Voter{
    using SafeMath for uint;
    
    // Mapping 
    mapping (address => Party) public parties;
    mapping (string => Election) public elections;
    mapping (address => FAQ) public faqs;

    // Arrays
    Party[] public partyList;
    Election[] public electionList;
    FAQ[] public faqList;
    string[] public partyNames;


    // counter varirables
    uint public totalCandidate = 0;
    uint public totalParty = 0;
    uint public totalElection = 0;
    uint public totalMaleVoters = 0;
    uint public totalFemaleVoters = 0;
    uint public totalOtherVoters = 0;

    // Event abstractions
    event PartyCreated(Party party);
    event CandidateCreated(Candidate candidate);
    event VoterCreated(Voter voter);
    event electionStart(Election election);
    event NewFaqAdded(FAQ faq);

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
        string memory _municipality, string memory _ward, string memory _gender
    ) public payable {
        address[] memory votedVoterLists;
        address _id = msg.sender;

        // verify voter if already exist
        if(candidates[_id].user.citizenshipNumber != 0){
            revert("Candidate already registered !");
        }

        updateCounter(_gender);

        Candidate memory candidate = Candidate(
            User(_id, _name, _citizenshipNo, _age, _gender, _dob, _email, _profile, _province, _district, _municipality, _ward),
             _partyName, _agenda, 0, votedVoterLists
        );

        candidates[_id] = candidate;
        candidateNames.push(_name);
        candidateList.push(candidate);
        totalCandidate = totalCandidate.add(1);

        emit CandidateCreated(candidate);
    }

    function addVoter(string memory _name, uint _citizenshipNo, uint _age, string memory _dob,
        string memory _email, string memory _profile,string memory _province,
        string memory _district, string memory _municipality, string memory _ward, string memory _gender
    ) public payable {
        address _id = msg.sender;

        // verify voter if already exist
        if(voters[_id].user.citizenshipNumber != 0){
            revert("Voter already registered !");
        }
        
        updateCounter(_gender);

        address[] memory votedCandidateList;
        Voter memory voter = Voter(
            User(_id, _name, _citizenshipNo, _age, _gender, _dob, _email, _profile, _province, _district, _municipality, _ward), 
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
        string memory _electionType,
        string[] memory galleryImagesUrl
    ) public payable{
        if(msg.sender != adminAddress){
            revert("Only admin is allow to create election !");
        }

        address[] memory selectedCandidates;
        Election memory election = Election(_title, _description, _startDate, _endDate, _electionType, selectedCandidates, galleryImagesUrl);

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

    function updateCounter(string memory _gender) public {
        if(keccak256(bytes(_gender)) == keccak256(bytes(gender_list[0]))){
            totalMaleVoters = totalMaleVoters.add(1);
        }else if(keccak256(bytes(_gender)) == keccak256(bytes(gender_list[1]))){
            totalFemaleVoters = totalFemaleVoters.add(1);
        }else if(keccak256(bytes(_gender)) == keccak256(bytes(gender_list[2]))){
            totalOtherVoters = totalOtherVoters.add(1);
        }
    }

    // getter functions
    function getAllParties() public view returns (Party[] memory){
        return partyList;
    }

    function getAllElections() public view returns (Election[] memory){
        return electionList;
    }

    function getPartyDetails(address owner) public view returns(Party memory){
        return parties[owner];
    }

    function getAllFAQs() public view returns (FAQ[] memory) {
        return faqList;
    }
    
    function isAdmin(address _id) public view returns (bool){
        return _id == adminAddress;
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
