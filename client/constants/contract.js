
export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_citizenshipNo",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_agenda",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_profile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_partyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_province",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_district",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_municipality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ward",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_totalMember",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_agenda",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_logoUrl",
				"type": "string"
			}
		],
		"name": "addParty",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_citizenshipNo",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_profile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_province",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_district",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_municipality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ward",
				"type": "string"
			}
		],
		"name": "addVoter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "fullName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "citizenshipNumber",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "age",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "dob",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "email",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "profile",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "province",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "district",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipality",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "ward",
								"type": "string"
							}
						],
						"internalType": "struct Structure.User",
						"name": "user",
						"type": "tuple"
					},
					{
						"internalType": "string",
						"name": "partyName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "agenda",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct Structure.Candidate",
				"name": "candidate",
				"type": "tuple"
			}
		],
		"name": "CandidateCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_endDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_electionType",
				"type": "string"
			}
		],
		"name": "createElection",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalMember",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "agenda",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "logoUrl",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "members",
						"type": "string[]"
					}
				],
				"indexed": false,
				"internalType": "struct Structure.Party",
				"name": "party",
				"type": "tuple"
			}
		],
		"name": "PartyCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "candidateName",
				"type": "string"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "candidateName",
				"type": "string"
			}
		],
		"name": "VoteCast",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "fullName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "citizenshipNumber",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "age",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "dob",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "email",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "profile",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "province",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "district",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipality",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "ward",
								"type": "string"
							}
						],
						"internalType": "struct Structure.User",
						"name": "user",
						"type": "tuple"
					},
					{
						"internalType": "bool",
						"name": "voted",
						"type": "bool"
					}
				],
				"indexed": false,
				"internalType": "struct Structure.Voter",
				"name": "voter",
				"type": "tuple"
			}
		],
		"name": "VoterCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "startDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "endDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "electionType",
						"type": "string"
					}
				],
				"indexed": false,
				"internalType": "struct Structure.Election",
				"name": "election",
				"type": "tuple"
			}
		],
		"name": "electionStart",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "citizenshipNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "profile",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "province",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "district",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "municipality",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ward",
						"type": "string"
					}
				],
				"internalType": "struct Structure.User",
				"name": "user",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "partyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "agenda",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateNames",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "citizenshipNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "profile",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "province",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "district",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "municipality",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ward",
						"type": "string"
					}
				],
				"internalType": "struct Structure.User",
				"name": "user",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "partyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "agenda",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "electionList",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "electionType",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "elections",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "electionType",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCandidates",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "fullName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "citizenshipNumber",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "age",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "dob",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "email",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "profile",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "province",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "district",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipality",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "ward",
								"type": "string"
							}
						],
						"internalType": "struct Structure.User",
						"name": "user",
						"type": "tuple"
					},
					{
						"internalType": "string",
						"name": "partyName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "agenda",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Structure.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllElections",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "startDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "endDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "electionType",
						"type": "string"
					}
				],
				"internalType": "struct Structure.Election[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllParties",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalMember",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "agenda",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "logoUrl",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "members",
						"type": "string[]"
					}
				],
				"internalType": "struct Structure.Party[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllVoters",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "fullName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "citizenshipNumber",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "age",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "dob",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "email",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "profile",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "province",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "district",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipality",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "ward",
								"type": "string"
							}
						],
						"internalType": "struct Structure.User",
						"name": "user",
						"type": "tuple"
					},
					{
						"internalType": "bool",
						"name": "voted",
						"type": "bool"
					}
				],
				"internalType": "struct Structure.Voter[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getCandidateDetails",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "fullName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "citizenshipNumber",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "age",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "dob",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "email",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "profile",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "province",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "district",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipality",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "ward",
								"type": "string"
							}
						],
						"internalType": "struct Structure.User",
						"name": "user",
						"type": "tuple"
					},
					{
						"internalType": "string",
						"name": "partyName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "agenda",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Structure.Candidate",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getPartyDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalMember",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "agenda",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "logoUrl",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "members",
						"type": "string[]"
					}
				],
				"internalType": "struct Structure.Party",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getVoterDetails",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "fullName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "citizenshipNumber",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "age",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "dob",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "email",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "profile",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "province",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "district",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipality",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "ward",
								"type": "string"
							}
						],
						"internalType": "struct Structure.User",
						"name": "user",
						"type": "tuple"
					},
					{
						"internalType": "bool",
						"name": "voted",
						"type": "bool"
					}
				],
				"internalType": "struct Structure.Voter",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "parties",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalMember",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "agenda",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "logoUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "partyList",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalMember",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "agenda",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "logoUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "partyNames",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalCandidate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalElection",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalParty",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVoter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "voterList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "citizenshipNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "profile",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "province",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "district",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "municipality",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ward",
						"type": "string"
					}
				],
				"internalType": "struct Structure.User",
				"name": "user",
				"type": "tuple"
			},
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "voterNames",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "citizenshipNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "profile",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "province",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "district",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "municipality",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ward",
						"type": "string"
					}
				],
				"internalType": "struct Structure.User",
				"name": "user",
				"type": "tuple"
			},
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const CONTRACT_ABI_ADDRESS = "0x1A568aF5Bf9dc3c42Fa1bAE797d29610176e6039";


