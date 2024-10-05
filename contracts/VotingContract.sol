// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract VotingContract {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;
    address public votingOrganizer;

    struct Candidate {
        uint candidateId;
        string name;
        string age;
        string image;
        uint voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreate(
        uint indexed candidateId,
        string name,
        string age,
        string image,
        uint voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;

    mapping(address => Candidate) public candidates;

    address[] public votedVoters;

    address[] public votersAddress;

    mapping(address => Voter) public voters;

    struct Voter {
        uint voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        string voter_ipfs;
        uint voter_allowed;
        bool voter_voted;
        uint voter_vote;
    }

    event VoterCreated(
        uint indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        string voter_ipfs,
        uint voter_allowed,
        bool voter_voted,
        uint voter_vote
    );

    constructor() {
        votingOrganizer = msg.sender;
        console.log("VotingContract deployed by:", votingOrganizer);
    }

    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Only organizer can create a candidate"
        );

        _candidateId.increment();

        uint idNumber = _candidateId.current();

        candidates[_address] = Candidate({
            candidateId: idNumber,
            name: _name,
            age: _age,
            image: _image,
            voteCount: 0,
            _address: _address,
            ipfs: _ipfs
        });

        candidateAddress.push(_address);
        emit CandidateCreate(idNumber, _name, _age, _image, 0, _address, _ipfs);
        console.log("Candidate added:", _name, "with ID:", idNumber);
    }

    function getCandidates() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidatesLength() public view returns (uint) {
        return candidateAddress.length;
    }

    function getCandidatedate(
        address _address
    ) public view returns (Candidate memory) {
        Candidate storage candidate = candidates[_address];
        require(candidate._address != address(0), "Candidate does not exist");

        return candidate;
    }

    //Voter

    function voterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Only organizer can create a voter"
        );

        _voterId.increment();
        uint voterIdNumber = _voterId.current();

        voters[_address] = Voter({
            voter_voterId: voterIdNumber,
            voter_name: _name,
            voter_image: _image,
            voter_address: _address,
            voter_ipfs: _ipfs,
            voter_allowed: 1, // Assuming 1 means allowed to vote, adjust as needed
            voter_voted: false,
            voter_vote: 1000
        });

        votersAddress.push(_address);
        emit VoterCreated(
            voterIdNumber,
            _name,
            _image,
            _address,
            _ipfs,
            1,
            false,
            1000
        );
        console.log("Voter added:", _name, "with ID:", voterIdNumber);
    }

    function vote(address _candidateAddress, uint candidateId) external {
        require(
            voters[msg.sender].voter_address != address(0),
            "Voter is not registered"
        );
        require(
            voters[msg.sender].voter_allowed > 0,
            "You have no right to Vote"
        );
        require(!voters[msg.sender].voter_voted, "You have already voted");

        // Ensure the candidate exists
        require(
            candidates[_candidateAddress]._address != address(0),
            "Candidate does not exist"
        );
        require(
            candidates[_candidateAddress].candidateId == candidateId,
            "Candidate ID does not match"
        );

        candidates[_candidateAddress].voteCount++;

        voters[msg.sender].voter_voted = true;
        voters[msg.sender].voter_vote = candidateId;

        votedVoters.push(msg.sender);
    }

    function getVoterLength() public view returns (uint) {
        return votedVoters.length;
    }

    function getVoterData(
        address _address
    )
        public
        view
        returns (
            uint voterId,
            string memory name,
            string memory image,
            address voterAddress,
            string memory ipfs,
            uint allowed,
            bool voted
        )
    {
        // Ensure the voter exists
        require(
            voters[_address].voter_address != address(0),
            "Voter does not exist"
        );

        // Retrieve voter information
        Voter storage voter = voters[_address];

        return (
            voter.voter_voterId,
            voter.voter_name,
            voter.voter_image,
            voter.voter_address,
            voter.voter_ipfs,
            voter.voter_allowed,
            voter.voter_voted
        );
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}
