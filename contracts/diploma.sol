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
        uint256 createdAt;
    }

    struct Institute {
        string name;
        string country;
        address instAddress;
        bool allowed;
        bool valid;
    }

    Degree[] all_degrees;
    Institute[] all_institute;
    mapping(address => Degree[]) addressToDegree;
    mapping(address => bool) allowed_creator;
    mapping(address => Institute) addressToInstitute;

    constructor(){
        owner = msg.sender;
    }

    //events
    event degreeCreated(address _creator, address _graduate, string _title);
    event creatorCreated(address _creator, string _name);
    event creatorDeleted(address _creator, string _name);
    event allowedCreator(address _creator, string _name);

    /**
        Owner only modifier.
        If i use this modifier in a function, it will only allow the creator of this contract to run it.
    */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "you cant use this function, only owner of the contract can."
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
            "you cant use this function, only certifie creator can."
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
    ) onlyCreators public returns(bool){
        Degree memory degree;

        degree.title = _title;
        degree.creator_adress = msg.sender;
        degree.graduate_adress = _to;
        degree.firstName = _firstName;
        degree.lastName = _lastName;
        degree.date = _date;
        degree.location = _location;
        degree.mention = _mention;
        degree.createdAt = block.timestamp;

        addressToDegree[_to].push(degree);
        all_degrees.push(degree);

        emit degreeCreated(msg.sender, _to, _title);

        return true;
    }

    /**
        Allows the owner to add a creator to the allowed creator list
    */
    function addCreator(address _creator, string memory _name, string memory _country) onlyOwner public{
        // if their is already a creator with the same address the function should throw
        // if(addressToInstitute[_creator].allowed) revert("this address is already used.");

        Institute memory inst;
        inst.country = _country;
        inst.name = _name;
        inst.allowed = true;
        inst.valid = true;

        addressToInstitute[_creator] = inst;
        allowed_creator[_creator] = true;

        all_institute.push(inst);

        emit creatorCreated(_creator, _name);
    }

    /**
        Allows the owner to delete a creator from the allowed creator list
    */
    function deleteCreator(address _creator) onlyOwner public{
        // if(!addressToInstitute[_creator].allowed) revert("No creator with this address.");

        allowed_creator[_creator] = false;
        addressToInstitute[_creator].allowed = false;

        emit creatorDeleted(_creator, addressToInstitute[_creator].name);
    }

    function allowCreator(address _creator) onlyOwner public{
        // if(!addressToInstitute[_creator].allowed) revert("No creator with this address.");

        allowed_creator[_creator] = true;
        addressToInstitute[_creator].allowed = true;

        emit allowedCreator(_creator, addressToInstitute[_creator].name);
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

    function getAllowedCreatorByAddress(address _creator) public view returns(bool) {
        return allowed_creator[_creator];
    }

    function getAllDegreeFromAddress(address _owner) public view returns(Degree[] memory) {
        return addressToDegree[_owner];
    }

    function getDegreeLengthFromAddress(address _owner) public view returns (uint){
        return addressToDegree[_owner].length;
    }

    function  getInstituteFromAddress(address _institute) public view returns(Institute memory){
        return addressToInstitute[_institute];
    }

    function getAllInstitutes() public view returns(Institute[] memory){
        return all_institute;
    }

    function getAllowedCreators() public view returns(address[] memory){
        address[] memory toReturn;

        for(uint i; i < all_institute.length; i++)
            if(all_institute[i].allowed == true)
                toReturn[i] = all_institute[i].instAddress;

        return toReturn;
    }
}