pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract diploma {
    string public title = "diplokma";
    address public owner;

    /**
        Structure of a degree. It will be the representation of a degree.
    */
    struct Degree {
        string title;
        address creator_adress;
        address graduate_adress;
        string firstName;
        string lastName;
        string date;
        string location;
        string mention;
    }

    Degree[] all_degrees;
    mapping(address => Degree[]) addressToDegree;
    mapping(address => bool) allowed_creator;

    constructor(){
        owner = msg.sender;
    }

    //events
    event degreeCreated(address _creator, address _graduate, string _title);
    event creatorCreated(address _creator, string _name);
    event creatorDeleted(address _creator, string _reason);

    /**
        Owner only modifier.
        If i use this modifier in a function, it will only allow the creator of this contract to run it.
    */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "you cant use this function"
        );
        _; // will execute the function that this modifier is attached to here
    }

    /**
        Owner only modifier.
        If i use this modifier in a function, it will only allow the creators allowed to run it.
    */
    modifier onlyCreators() {
        require(
            allowed_creator[msg.sender],
            "you cant use this function"
        );
        _;
    }

    /**
    Allows creators to add a degree to an adress
    */
    function createDegree(
        string memory _title,
        address _to,
        string memory _firstName,
        string memory _lastName,
        string memory _date,
        string memory _location,
        string memory _mention
    ) onlyCreators public {
        Degree memory degree;

        degree.title = _title;
        degree.creator_adress = msg.sender;
        degree.graduate_adress = _to;
        degree.firstName = _firstName;
        degree.lastName = _lastName;
        degree.date = _date;
        degree.location = _location;
        degree.mention = _mention;

        addressToDegree[_to].push(degree);
        all_degrees.push(degree);
    }

    /**
        Allows the owner to add a creator to the allowed creator list
    */
    function addCreator(address _creator) onlyOwner public{
        allowed_creator[_creator] = true;
    }

    /**
        Allows the owner to delete a creator from the allowed creator list
    */
    function deleteCreator(address _creator) onlyOwner public{
        allowed_creator[_creator] = false;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function getAllDegrees() public view returns(Degree[] memory){
        return all_degrees;
    }

    function getLength() public view returns (uint){
        return all_degrees.length;
    }    

    function name() public view returns (string memory){
        return title;
    }
}