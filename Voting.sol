// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Ballot {
    string[] private Parties = [
        "NEPALI CONGRESS",
        "EMALAY",
        "MAOIST",
        "NEPAL SOCIALIST PARTY",
        "RASTRIYA PRAJATANTRA PARTY",
        "PEOPLE'S PROGRESSIVE PARTY",
        "LOKTANTRIK SAMAJWADI PARTY NEPAL",
        "INDEPENDENT"
    ];

    string[] private ElectionType = [
        "Federal Parliament",
        "Province wise Election",
        "Local Election"
    ];

    string[] private DistrictLevelPosition = [
        "Mayor",
        "Deputy Mayor",
        "Ward Chairperson"
    ];

    string[] private Provinces = [
        "Eastern Province",
        "Madhesh Pradesh",
        "Bagmati Pradesh",
        "Gandaki Pradesh",
        "Lumbini Pradesh",
        "Karnali Pradesh",
        "Sudur Pashchim Pradesh"
    ];

    struct CandidateDetails {
        uint256 citizenship_number;
        uint256 totalVotes;
        string name;
        string email;
        string party;
        string electionType;
        string position;
    }

    struct VoterDetails {
        uint256 citizenship_number;
        string name;
        string email;
        uint256 limitCount;
    }

    struct BallotDetails {
        uint256 candidate_id;
        uint256 voter_id;
    }

    BallotDetails[] mayorBallots;
    BallotDetails[] deputyBallots;
    BallotDetails[] wardBallots;
    CandidateDetails[] candidates;
    VoterDetails[] voters;
    CandidateDetails[] winnerDetails;

    function vote(uint256 _voter_id, uint256 _candidate_id, string memory _ballot_type) public payable returns(bool) {
        require(_voter_id != 0 && _candidate_id != 0 && bytes(_ballot_type).length > 0, "Some parameter are missing" );

        // vote duplicacy validation
        if(stringsEquals(_ballot_type, "Mayor")){
            for (uint256 i = 0; i < mayorBallots.length; i++) {
                if(mayorBallots[i].voter_id != _voter_id && mayorBallots[i].candidate_id != _candidate_id){
                    return false;
                }
            }
        }else if(stringsEquals(_ballot_type, "Deputy Mayor")){
            for (uint256 i = 0; i < deputyBallots.length; i++) {
                if( deputyBallots[i].voter_id != _voter_id && deputyBallots[i].candidate_id != _candidate_id){
                    return false;
                }
            }
        }else if(stringsEquals(_ballot_type, "Local Election")){
            for (uint256 i = 0; i < wardBallots.length; i++) {
                if( wardBallots[i].voter_id != _voter_id && wardBallots[i].candidate_id != _candidate_id){
                    return false;
                }
            }
        }

        // vote limit count
        for (uint256 i = 0; i < voters.length; i++) {
            if(voters[i].citizenship_number == _voter_id){
                require( voters[i].limitCount <= 3, "You cannot vote more than 3 distinct parties.");
            }
        }

        // increase the vote limit count
        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i].citizenship_number == _voter_id) {
                voters[i].limitCount = voters[i].limitCount + 1;
                break;
            }
        }

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].citizenship_number == _candidate_id) {
                candidates[i].totalVotes = candidates[i].totalVotes + 1;
                break;
            }
        }

        // store votes
        BallotDetails memory details = BallotDetails(_voter_id, _candidate_id);
        
        if(stringsEquals(_ballot_type, "Mayor")){
            mayorBallots.push(details);
        }else if(stringsEquals(_ballot_type, "Deputy Mayor")){
            deputyBallots.push(details);
        }else{
            wardBallots.push(details);
        }

        return true;
    }

    function addCandidate(
        uint256 _citizenship_number,
        string memory _name,
        string memory _email,
        string memory _party,
        string memory _electionType,
        string memory _position
    ) public {
        // store candidates
        CandidateDetails memory details = CandidateDetails(
            _citizenship_number,
            0,
            _name,
            _email,
            _party,
            _electionType,
            _position
        );
        candidates.push(details);
    }

    function addVoter(
        uint256 _citizenship_number,
        string memory _name,
        string memory _email
    ) public {
        // store voter
        VoterDetails memory details = VoterDetails(
            _citizenship_number,
            _name,
            _email,
            0
        );
        voters.push(details);
    }

    function getVoterDetails(uint256 _citizenship_number)
        public
        view
        returns (VoterDetails memory)
    {
        VoterDetails memory result;
        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i].citizenship_number == _citizenship_number) {
                result = voters[i];
                break;
            }
        }

        return result;
    }

    function getCandidateDetails(uint256 _citizenship_number)
        public
        view
        returns (CandidateDetails memory)
    {
        CandidateDetails memory result;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].citizenship_number == _citizenship_number) {
                result = candidates[i];
                break;
            }
        }

        return result;
    }

    function getAllCandidates()
        public
        view
        returns (CandidateDetails[] memory)
    {
        return candidates;
    }

    function getAllParties() public view returns (string[] memory) {
        return Parties;
    }

    function getAllElectionType() public view returns (string[] memory) {
        return ElectionType;
    }

    function getAllDistrictLevelPosition()
        public
        view
        returns (string[] memory)
    {
        return DistrictLevelPosition;
    }

    function getAllProvince() public view returns (string[] memory) {
        return Provinces;
    }

    // string comparision.      [Helper function]
    function stringsEquals(string memory s1, string memory s2)
        public
        pure
        returns (bool)
    {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i = 0; i < l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    // filter highest vote         [Helper function]
    function getHighestVoterDetails(string memory _position)
        public
        view
        returns (uint256)
    {
        uint256 winnerId = 0;
        uint256 tempVoteCount = 0;
        // mayor winner
        for (uint256 i = 0; i < candidates.length; i++) {
            if (stringsEquals(candidates[i].position, _position)) {
                if (candidates[i].totalVotes > tempVoteCount) {
                    winnerId = candidates[i].citizenship_number;
                    tempVoteCount = candidates[i].totalVotes;
                }
            }
        }

        return winnerId;
    }

    function getWinners(string memory _electionType) public returns (CandidateDetails[] memory){
        if (stringsEquals(_electionType, "Local Election")) {
            winnerDetails.push(getCandidateDetails(getHighestVoterDetails("Mayor")));
            winnerDetails.push(getCandidateDetails(getHighestVoterDetails("Deputy Mayor")));
            winnerDetails.push(getCandidateDetails(getHighestVoterDetails("Ward Chairperson")));
            return winnerDetails;
        }

        return winnerDetails;
    }
}
