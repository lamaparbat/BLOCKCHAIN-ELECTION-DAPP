// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Structure {
    struct User {
        address _id;
        string fullName;
        uint citizenshipNumber;
        uint age;
        string dob;
        string email;
        string profile;
        string province;
        string district;
        string municipality;
        string ward;
    }

    struct Voter {
        User user;
<<<<<<< HEAD
        string[] votedCandidateList;
=======
        address[] votedCandidateList;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
    }
    struct Candidate {
        User user;
        string partyName;
        string agenda;
<<<<<<< HEAD
        uint256 voteCount;
        string[] votedVoterLists;
=======
        uint voteCount;
        address[] votedVoterLists;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
    }

    struct Party{
        address owner;
        string name;
        uint totalMember;
        string agenda;
        string logoUrl;
        string[] members;
    }

<<<<<<< HEAD
    struct Election {
=======
    struct Election{
        address owner;
>>>>>>> 43b8cc9fc904a013b7fc10d9ddc8534bce9a2f3a
        string title;
        string description;
        string startDate;
        string endDate;
        string electionType;
        Candidate[] selectedCandidates;
    }
}
