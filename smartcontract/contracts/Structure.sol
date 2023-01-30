// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Structures{
    struct Candidate {
        string name;
        uint citizenship_no;
        uint age;
        string agenda;
        string dob;
        string address_name;
        string email;
        string profile;
        uint voteCount;
    }
    struct Voter {
        string name;
        uint citizenship_no;
        uint age;
        string agenda;
        string dob;
        string address_name;
        string email;
        string profile;
        bool voted;
    }
}
