// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Structure {
    struct User {
        string fullName;
        uint256 citizenshipNumber;
        uint256 age;
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
        string[] votedCandidateList;
    }
    struct Candidate {
        User user;
        string partyName;
        string agenda;
        uint256 voteCount;
        string[] votedVoterLists;
    }

    struct Party {
        string name;
        uint256 totalMember;
        string agenda;
        string logoUrl;
        string[] members;
    }

    struct Election {
        string title;
        string description;
        string startDate;
        string endDate;
        string electionType;
        Candidate[] selectedCandidates;
    }
}
