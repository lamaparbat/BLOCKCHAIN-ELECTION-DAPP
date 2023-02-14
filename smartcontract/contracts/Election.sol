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
        address[] votedCandidateList;
    }
    struct Candidate {
        User user;
        string partyName;
        string agenda;
        uint voteCount;
        address[] votedVoterLists;
    }

    struct Party{
        string name;
        uint totalMember;
        string agenda;
        string logoUrl;
        string[] members;
    }

    struct Election{
        string title;
        string description;
        string startDate;
        string endDate;
        string electionType;
        Candidate[] selectedCandidates;
    }
}
