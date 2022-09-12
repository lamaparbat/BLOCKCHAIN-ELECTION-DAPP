// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


contract Transaction{
 uint256 transactionCounter;

 event Transfer (address from, address reciever, uint amount, string message, uint256 timestamp, string keyword);

 struct TransferStruct{
    address sender;
    address reciever;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
 }

 TransferStruct[] transactions;




}