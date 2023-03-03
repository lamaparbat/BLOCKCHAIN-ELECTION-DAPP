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

    struct ReplyComment {
        address _id;
        string replyMsg;
        string createdAt;
    }

    struct Voter {
        User user;
        address[] votedCandidateList;
        uint voteLimitCount;
    }
    struct Candidate {
        User user;
        string partyName;
        string agenda;
        uint voteCount;
        address[] votedVoterLists;
    }

    struct Party{
        address owner;
        string name;
        uint totalMember;
        string agenda;
        string logoUrl;
        address[] members;
    }

    struct Election{
        string title;
        string description;
        string startDate;
        string endDate;
        string electionType;
        address[] selectedCandidates;
    }

    struct FAQ {
        address _id;
        string title;
        string description;
        string fileUrl;
        string createdAt;
        ReplyComment[] comments;
    }
}
