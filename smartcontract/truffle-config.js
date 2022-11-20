const path = require("path");

module.exports = {
  contracts_build_directory: '../client/src/',
  networks: {
    development: {
      network_id: '*',
      host: 'localhost',
      port: 8545
    }
  },
  compilers: {
    solc: {
      version: 
    }
  }
}