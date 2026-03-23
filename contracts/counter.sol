// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {

    struct User {
        string name;
        string date;
        string city;
        string state;
    }

    mapping(address => User) public users;

    function saveDetails(
        string memory _name,
        string memory _date,
        string memory _city,
        string memory _state
    ) public payable {

        require(msg.value == 1 ether, "Must send exactly 1 ETH");

        users[msg.sender] = User(_name, _date, _city, _state);
    }
}
