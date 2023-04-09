// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Auth {
    address public adminAddress;
    
    constructor(){
        adminAddress = msg.sender;
    }

    function isAdmin(address _id) public view returns (bool){
        return _id == adminAddress;
    }

}
