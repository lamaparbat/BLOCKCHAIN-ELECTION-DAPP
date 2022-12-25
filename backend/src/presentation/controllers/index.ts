const voterController = require("./voters/index");
const candidateController = require("./party/index");
const createElectionController = require("./createElection.controller");

module.exports = {
 voterController,
 candidateController,
 createElectionController
}