# Blockchain e-voting system (WEB 3.O)
![a](https://user-images.githubusercontent.com/64581460/200334222-dff3cce2-5398-4607-b174-141566b1e648.jpeg)

## HOT Candidate Live Vote Count
<img width="1440" alt="Screen Shot 2022-11-27 at 22 27 26" src="https://user-images.githubusercontent.com/64581460/204148574-10d794e3-091b-423e-befa-32b5a76981e6.png">

## Voter Poll Card List UI
<img width="1440" alt="Screen Shot 2022-12-01 at 22 52 21" src="https://user-images.githubusercontent.com/64581460/205115733-39bc2869-52b7-442f-b047-9469dfa6491a.png">


## Mobile view navigation bar
![Screen Shot 2022-11-30 at 21 47 45](https://user-images.githubusercontent.com/64581460/204847780-624cdc5b-3a61-411a-aa44-d314db1eb463.png)

## Voter Registration UI
<img width="1151" alt="Screen Shot 2022-12-04 at 10 20 53" src="https://user-images.githubusercontent.com/64581460/205474724-e33ab399-49d6-4adc-b3e6-61b0288fee8a.png">


## Workflow overview

![Blockchain Voting Interaction](https://user-images.githubusercontent.com/64581460/200596235-cba703b8-ac91-4600-9a02-d271a6ad8ed6.png)


## Project Architecture
<img width="789" alt="Screen Shot 2022-12-05 at 22 28 46" src="https://user-images.githubusercontent.com/64581460/205693485-16e2a57b-e5d4-4f8a-8c16-4f237ac3d80b.png">

<img width="752" alt="Screen Shot 2022-12-05 at 22 29 31" src="https://user-images.githubusercontent.com/64581460/205693547-83bb9be2-fa81-4a56-bb37-23d6de8b1471.png">


## Introduction
Before diving into the agenda, lets know what is blockchain. In general, Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system. It is a decentralized, distributed and public digital ledger that is used to record transactions across many computers so that the record cannot be altered retroactively without the alteration of all subsequent blocks and the consensus of the network.

The purpose of the blockchain is to share information amongst all parties that access it via an application. Access to this ledger in terms of reading and writing may be unrestricted ('permissionless'), or restricted ('permissioned').

Blockchain technology was developed to address these problems, and it now provides decentralized nodes for electronic voting. Electronic voting systems are created using blockchain technology primarily because to the benefits of end-to-end verification.

## System Features
- User centered Design
- Realtime voting updates & counts
- Data Visualization
- Web 3.0
- Smart Contract

## Problems with traditional voting system.
- First and foremost, privacy and unfairity risk
- Large amount of manpower (Myadi police) required & cost aswell.
- Citizen outside the country cannot vote their favourite ones.
- Voter might be stand on the queue for long time and very difficulty for the old age citizens
- Voting result might takes long time to publish

## Advantages of decentralized voting system
-> All above traditional voting system drawbacks can overcome with blockchain technology.

## Disadvantages of decentralized voting system
- The reason blockchain is a highly secure system is the ledger is public. All past transactions can be seen by anyone who works the system, and they can’t be changed because everyone will notice. That doesn’t work in a voting system where secret ballot is mandated. Every transaction is identifiable.


## Conclusion

## Functional Decomposition Diagram
![FDD](https://user-images.githubusercontent.com/64581460/201529832-34d33fde-4dd4-4467-a182-dc286865a9ee.png)


## Documentation 🚀🚀 [Installation guide]

   ### Frontend setup
   1. Download and install NodeJS [Link: https://nodejs.org/en/download/]
   2. Donwload and install VSCode [Link: https://code.visualstudio.com/download]
   3. Open the vscode and create a folder for frontend.
   4. Go inside the recently created folder and init the react project using your fav react-installer like CRA || Vite
      - ``` cd folder_name ```
      - ``` npx create-next-app app_name --typescript ``` [init next project]
      - ``` npm i web3 ```
      - ``` npm run dev ``` [run the react project]
      
   ### Blockchain [Smart contract] setup
   5. Go back to the main folder [cd ..] & create a folder for smartcontract.
     i). Open your favourite browser and 
        - Download and install gnache [Link: https://trufflesuite.com/ganache/]
     
     ii). Open smartcontract folder in vscode terminal and  
        - ` npm i truffle --globally `
        - ` truffle init ` [initialize the localhost blockchain environment using truffle ]`
        - Write smart contract using solidity
        - ` truffle compile`
        - ` truffle migrate` [will generate build file in json format]
        - Copy the "abi" array & address from the generated .json from from /build folder and paste on constant file of your client side app.
     iii). Now you can access all the functions of smartcontract features by simply using `web3.eth.methods.call()` for getter function && `web3.eth.methods.send({from: account_address});`
        


## Backend API Docs
  1. Installation
    ``` npm init 
    
    ``` npm add express ts-node @types/node @types/express dotenv nodemon cors helmet pm2
    
    ``` npm add jest ts-jest @types/jest
    
    ``` npx test-jest config:init ``` [generate jest.config.js files with some prebuilt configs]
   
   PM2 Shell Commands
   0. ``` pm2 ping ``` [Make sure pm2 has launched]
   1. ``` pm2 start starter_file --watch --ignore-watch=node_modules```    [Start the process]
   2. ``` pm2 start starter_file -i max  ``` [Start all the process based on the total number of core]
   2. ``` pm2 log ``` [See the log details]
   3. ``` pm2 ls || pm2 status || pm2 list ``` [See the running process in table format]
   4. ``` pm2 stop process_name ``` [Stop the specific process]
   5. ``` pm2 stop all ``` [Stop all processes]
   6. ``` pm2 delete process_name ``` [Delete the specific process]
   7. ``` pm2 delete all ``` [Delete all processes]
   8. ``` pm2 monit ``` [Monit the process details including memory usage, uptime, etc]
   7. ``` pm2 restart starter_file``` [Delete all processes]

Author: Parbat Lama
