// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// V6
//
// attempt at contract that the frontrunners could fail.
//
// calling the withdraw method is non-deterministic, it will depend on the validator of the tx
//
// The `withdraw` method restricts the callers to only EOA, so there cannot be any checks to make
// sure the contract is returning funds to the sender, which will be more risky for the front runner.
// If the withdraw method is called, something will be returned some of the time, 50% chance
// depending on the address for the coinbase

contract DarkForestV6 {

    event Withdrawal(uint amount, uint when);

    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw() public payable {
        require(msg.value != 0, "value cannot be zero");
        require(msg.sender == tx.origin, "caller must be EOA");
        if (isValid() || msg.sender == owner) {
            emit Withdrawal(address(this).balance, block.number);
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    function isValid() public view returns (bool) {
        return getCoinbase() % 2 == 0;
    }

    function getCoinbase() public view returns (uint) {
        return uint(uint160(address(block.coinbase)));
    }

    function convertAddress(address _address) public pure returns (uint256) {
        return uint256(uint160(_address));
    }

    // needed to add to the balance
    receive() external payable {
    }

}