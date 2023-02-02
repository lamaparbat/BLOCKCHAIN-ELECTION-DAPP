// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Structure {
    struct Candidate {
        string fullName;
        uint citizenshipNumber;
        uint age;
        string agenda;
        string dob;
        string address_name;
        string email;
        string profile;
        string partyName;
        uint voteCount;
    }
    struct Voter {
        string fullName;
        uint citizenshipNumber;
        uint age;
        string dob;
        string address_name;
        string email;
        string profile;
        bool voted;
    }
}