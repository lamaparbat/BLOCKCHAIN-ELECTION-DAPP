// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./src/components/Candidate.sol";
import "./src/components/Voter.sol";
import "./src/components/Party.sol";

contract Election is Candidate, Voter, Party {
    using SafeMath for uint256;

    // Mapping
    mapping(string => Election) public elections;
    mapping(address => FAQ) public faqs;

    // Arrays
    Election[] public electionList;
    FAQ[] public faqList;

    // counter varirables
    uint256 public totalParty = 0;
    uint256 public totalElection = 0;

    // Event abstractions
    event PartyCreated(Party party);
    event electionStart(Election election);
    event NewFaqAdded(FAQ faq);

    // caste vote
    function vote(address _candidateId, string memory electionAddress) public payable {
        address _voterId = msg.sender;

        // restrict admin for vote casting
        if (_voterId == adminAddress) {
            revert("Admin is restrict to vote !");
        }

        // restrict candidate for vote casting
        for(uint256 i = 0;i<candidateList.length;i++){
            require(candidateList[i].user._id != _voterId, "Candidate is restrict to vote !");
        }

        // verify vote limit count
        if (voters[_voterId].voteLimitCount > 3) {
            revert("You have exceed the vote caste limit.");
        }

        // verify duplication vote
        for(uint256 a = 0; a < candidates[_candidateId].votedVoterLists.length; a++){
            require(candidates[_candidateId].votedVoterLists[a] != _voterId, "You have already voted !");
        }

        candidates[_candidateId].votedVoterLists.push(_voterId);
        voters[_voterId].votedCandidateList.push(_candidateId);
        candidates[_candidateId].voteCount = candidates[_candidateId]
            .voteCount
            .add(1);
        voteCount = voteCount.add(1);


        // update the copy data in election collections
        for (uint256 i = 0; i < electionList.length; i++) {
            if (keccak256(bytes(electionList[i].startDate)) ==  keccak256(bytes(electionAddress))) {
                for(uint256 j = 0; j< electionList[i].candidates.length;j++){
                    if(electionList[i].candidates[j].user._id == _candidateId){
                        electionList[i].candidates[j].votedVoterLists.push(_voterId);
                        electionList[i].candidates[j].voteCount = elections[electionAddress].candidates[j].voteCount.add(1);
                    }
                }
            }
        }

        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i].user._id == _candidateId) {
                candidateList[i].votedVoterLists.push(_voterId);
            }
        }

        for (uint256 i = 0; i < voterList.length; i++) {
            if (voterList[i].user._id == _voterId) {
                voterList[i].votedCandidateList.push(_candidateId);
            }
        }

        voters[_voterId].voteLimitCount = voters[_voterId].voteLimitCount.add(
            1
        );

        emit VoteCast(candidates[_candidateId]);
    }

    function addParty(
        string memory _name,
        uint256 _totalMember,
        string memory _agenda,
        string memory _logoUrl
    ) public payable isAuthorize(msg.sender) {
        address[] memory emptyArray;
        Party memory party = Party(
            adminAddress,
            _name,
            _totalMember,
            _agenda,
            _logoUrl,
            emptyArray
        );

        parties[adminAddress] = party;
        partyNames.push(_name);
        partyList.push(party);
        totalParty = totalParty.add(1);

        emit PartyCreated(party);
    }

    function createElection(
        string memory _title,
        string memory _description,
        string memory _startDate,
        string memory _endDate,
        string memory _electionType,
        string[] memory galleryImagesUrl
    ) public payable isAuthorize(msg.sender) {
        Candidate[] memory _candidates;

        Election memory election = Election(
            _title,
            _description,
            _startDate,
            _endDate,
            _electionType,
            _candidates,
            galleryImagesUrl
        );

        elections[_startDate] = election;
        electionList.push(election);
        totalElection = totalElection.add(1);

        emit electionStart(election);
    }


    function addSelectedCandidates(
        SelectedCandidatePayload[] memory _selectedCandidates,
        string memory electionAddress
    ) public payable isAuthorize(msg.sender) {
        for (uint256 i = 0; i < _selectedCandidates.length; i++) {
            Candidate memory _candidate = candidates[_selectedCandidates[i]._id];
            _candidate.position = _selectedCandidates[i].position;
            elections[electionAddress].candidates.push(_candidate);
        }

        for (uint256 k = 0; k < electionList.length; k++) {
            if (
                keccak256(bytes(electionList[k].startDate)) ==
                keccak256(bytes(electionAddress))
            ) {
                for (uint256 j = 0; j < _selectedCandidates.length; j++) {
                    Candidate memory _candidate = candidates[_selectedCandidates[j]._id];
                    _candidate.position = _selectedCandidates[j].position;
                    electionList[k].candidates.push(_candidate);
                }
                break;
            }
        }
    }

    function addFaqs(
        string memory title,
        string memory description,
        string memory fileUrl,
        string memory createdAt
    ) public payable {
        address _id = msg.sender;
        ReplyComment[] memory replies;

        FAQ memory faq = FAQ(
            _id,
            title,
            description,
            fileUrl,
            createdAt,
            replies
        );
        faqs[_id] = faq;
        faqList.push(faq);
    }

    function addFaqComment(
        address faqId,
        string memory replyMsg,
        string memory createdAt
    ) public payable {
        address _id = msg.sender;
        ReplyComment memory reply = ReplyComment(_id, replyMsg, createdAt);

        faqs[faqId].comments.push(reply);

        for (uint256 i = 0; i < faqList.length; i++) {
            if (faqList[i]._id == faqId) {
                faqList[i].comments.push(reply);
                break;
            }
        }
    }

    function getAllElections() public view returns (Election[] memory) {
        return electionList;
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

// vote data mockup
// PARBAT LAMA,4342,23,MALE,1999-05-20T09:05,parbat@gmail.com,https://storage.googleapis.com/download/storage/v1/b/dapp-voting-6045d.appspot.com/o/candidates%2F20220710_120630-1681960833232.jpg?generation=1681960836290419&alt=media,province1,Udayapur,Katari municipality
