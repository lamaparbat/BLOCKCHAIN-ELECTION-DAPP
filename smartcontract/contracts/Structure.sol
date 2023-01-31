// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Structure {
    struct Candidate {
        string name;
        uint256 citizenshipNo;
        uint256 age;
        string agenda;
        string dob;
        string address_name;
        string email;
        string profile;
        string partyName;
        uint256 voteCount;
    }
    struct Voter {
        string name;
        uint256 citizenshipNo;
        uint256 age;
        string agenda;
        string dob;
        string address_name;
        string email;
        string profile;
        bool voted;
    }
}
