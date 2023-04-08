// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "./Structure.sol";
import "./Auth.sol";

contract Party is Structure, Auth{
    using SafeMath for uint;
    
    // Mapping 
    mapping (address => Party) public parties;

    // Arrays
    Party[] public partyList;
    string[] public partyNames;


    // counter varirables
    uint public totalParty = 0;

    // Event abstractions
    event PartyCreated(Party party);

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

    // getter functions
    function getAllParties() public view returns (Party[] memory){
        return partyList;
    }

    function getPartyDetails(address owner) public view returns(Party memory){
        return parties[owner];
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
