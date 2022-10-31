// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Ballot {
    struct CandidateDetails {
        uint256 citizenship_number;
        uint256 totalVotes;
        string name;
        string email;
        string party;
    }

    struct VoterDetails {
        uint256 citizenship_number;
        string name;
        string email;
    }

    struct BallotDetails {
        uint256 candidate_id;
        uint256 voter_id;
    }

    BallotDetails[] ballots;
    CandidateDetails[] candidates;
    VoterDetails[] voters;

    function vote(uint256 _voter_id, uint256 _candidate_id) public{
        // vote duplicacy validation
        for (uint256 i = 0; i < ballots.length; i++) {
            require(ballots[i].voter_id == _voter_id && ballots[i].candidate_id == _candidate_id, "Already voted.");
        }

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].citizenship_number == _candidate_id) {
                candidates[i].totalVotes = candidates[i].totalVotes + 1;
                break;
            }
        }

        // store votes
        BallotDetails memory details = BallotDetails(_voter_id, _candidate_id);
        ballots.push(details);
    }

    function addCandidate(
        uint256 _citizenship_number,
        string memory _name,
        string memory _email,
        string memory _party
    ) public {
        // store candidates
        CandidateDetails memory details = CandidateDetails(
            _citizenship_number,
            0,
            _name,
            _email,
            _party
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
            _email
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

    function getAllVotes() public view returns (BallotDetails[] memory) {
        return ballots;
    }
}
