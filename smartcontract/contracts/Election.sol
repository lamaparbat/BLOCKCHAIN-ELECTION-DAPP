// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";

<<<<<<< HEAD
contract Election is Structure {
    using SafeMath for uint256;

    // Mapping
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => Voter) public voters;
    mapping(string => Party) public parties;
    mapping(string => Election) public elections;
=======
contract Election is Structure{
    using SafeMath for uint;
    
    // Mapping 
    mapping (address => Candidate) public candidates;
    mapping (address => Voter) public voters;
    mapping (address => Party) public parties;
    mapping (address => Election) public elections;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a

    // Arrays
    Candidate[] public candidateList;
    Voter[] public voterList;
    Party[] public partyList;
    Election[] public electionList;
    string[] public candidateNames;
    string[] public voterNames;
    string[] public partyNames;



    // static variables
<<<<<<< HEAD
    uint256 public totalCandidate = 0;
    uint256 public totalVoter = 0;
    uint256 public totalParty = 0;
    uint256 public totalElection = 0;
    uint256 public voteCount = 0;
=======
    uint public totalCandidate = 0;
    uint public totalVoter = 0;
    uint public totalParty = 0;
    uint public totalElection = 0;
    uint public voteCount = 0;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a

    // Event
    event PartyCreated(Party party);
    event CandidateCreated(Candidate candidate);
    event VoterCreated(Voter voter);
    event VoteCast(Candidate candidate);
    event electionStart(Election election);
<<<<<<< HEAD

    // updators
    function vote(uint256 _citizenshipNo) public {
        candidateList[_citizenshipNo];
        candidates[_citizenshipNo].voteCount = candidates[_citizenshipNo]
            .voteCount
            .add(1);
        voteCount = voteCount.add(1);

        emit VoteCast(candidates[_citizenshipNo]);
=======
    
    // updators
    function vote(address _candidateId) public payable{
        address _voterId = msg.sender;
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
        

        emit VoteCast(candidates[_candidateId]);
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
    }

    // setter functions
    function addParty(string memory _name, uint _totalMember, string memory _agenda, string memory _logoUrl) public payable {
        address owner = msg.sender;
        string[] memory emptyArray;
        Party memory party = Party(owner, _name, _totalMember, _agenda, _logoUrl, emptyArray);
        
        parties[owner] = party;
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
        Candidate memory candidate = Candidate(
<<<<<<< HEAD
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
=======
            User(_id, _name, _citizenshipNo, _age, _dob, _email, _profile, _province, _district, _municipality, _ward),
             _partyName, _agenda, 0, votedVoterLists
        );

        candidates[_id] = candidate;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
        candidateNames.push(_name);
        candidateList.push(candidate);
        totalVoter = totalVoter.add(1);

        emit CandidateCreated(candidate);
    }

    function addVoter(string memory _name, uint _citizenshipNo, uint _age, string memory _dob,
        string memory _email, string memory _profile,string memory _province,
        string memory _district, string memory _municipality, string memory _ward
    ) public payable {
        address[] memory votedCandidateList;
        address _id = msg.sender;
        Voter memory voter = Voter(
            User(_id, _name, _citizenshipNo, _age, _dob, _email, _profile, _province, _district, _municipality, _ward), 
            votedCandidateList
        );
<<<<<<< HEAD

        voters[_citizenshipNo] = voter;
=======
        
        voters[_id] = voter;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
        voterNames.push(_name);
        voterList.push(voter);
        totalVoter = totalVoter.add(1);

        emit VoterCreated(voter);
    }

<<<<<<< HEAD
    function createElection(
=======
    function createElection( 
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
        string memory _title,
        string memory _description,
        string memory _startDate,
        string memory _endDate,
        string memory _electionType
<<<<<<< HEAD
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
=======
    ) public payable{
        address owner = msg.sender;
        Candidate[] memory selectedCandidates;
        Election memory election = Election(owner, _title, _description, _startDate, _endDate, _electionType, selectedCandidates);

        elections[owner] = election;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
        electionList.push(election);
        totalElection = totalElection.add(1);

        emit electionStart(election);
    }

    function addSelectedCandidates(
        Candidate[] memory _selectedCandidates,
<<<<<<< HEAD
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
=======
        address electionAddress
    ) public payable{
        for (uint i = 0; i < _selectedCandidates.length; i++) {
            elections[electionAddress].selectedCandidates.push(_selectedCandidates[i]);
        }

        for(uint i = 0; i < electionList.length; i++){
            if(electionList[i].owner == electionAddress){
                for (uint j = 0; j < _selectedCandidates.length; j++) {
                    electionList[i].selectedCandidates.push(_selectedCandidates[j]);
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
                }
                break;
            }
        }
    }

<<<<<<< HEAD
=======

>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
    }
}




// test data
// Parbat, 0778, 22, wanna make secure system, sep 12 2022, kathamandu nepal, parbat@gmail.com, http://profile.com, Congress
// Gaurab, 0778, 22, oct 11 2022, Pokhara nepal, garuab@gmail.com, http://profile.com

<<<<<<< HEAD
=======

>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
// create election
// Election 2022, hello world election, sep 12 2022 , sep 13 2022, province
