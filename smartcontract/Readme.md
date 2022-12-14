## Documentation 🚀🚀 [Installation guide]
  
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
        
