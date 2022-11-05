// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Constants {
    string[] public Parties = [
        "NEPALI CONGRESS",
        "EMALAY",
        "MAOIST",
        "NEPAL SOCIALIST PARTY",
        "RASTRIYA PRAJATANTRA PARTY",
        "PEOPLE'S PROGRESSIVE PARTY",
        "LOKTANTRIK SAMAJWADI PARTY NEPAL",
        "INDEPENDENT"
    ];

    string[] public ElectionType = [
        "Federal Parliament",
        "Province wise Election",
        "Local Election"
    ];

    string[] public DistrictLevelPosition = [
        "Mayor",
        "Deputy Mayor",
        "Ward Chairperson"
    ];

    string[] public Provinces = [
        "Eastern Province",
        "Madhesh Pradesh",
        "Bagmati Pradesh",
        "Gandaki Pradesh",
        "Lumbini Pradesh",
        "Karnali Pradesh",
        "Sudur Pashchim Pradesh"
    ];
}
