pragma solidity ^0.8.0;


import "hardhat/console.sol";

contract test {
    string public title = "test2";

    // returns the name of the contract
    function name() public view returns (string memory){
        return title;
    }
}