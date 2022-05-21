pragma solidity ^0.8.0;


import "hardhat/console.sol";

contract diploma {
    string public title = "diplokma";

    // returns the name of the contract
    function name() public view returns (string memory){
        return title;
    }
}