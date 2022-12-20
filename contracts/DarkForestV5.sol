// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// V4
//
// attempt at contract that the frontrunners could fail.
//
// calling the withdraw method is non-deterministic. sometimes the call will succeed, sometimes it will
// return a single wei depending on the block number
//
// The `withdraw` method restricts the callers to only EOA, so there cannot be any checks to make
// sure the contract is returning funds to the sender, which will be more risky for the front runner.
// If the method is called after the trapBlockNumber, then nothing is returned to the sender.

contract DarkForestV5 {

    event Withdrawal(uint amount, uint when);
    event Trap(uint when);

    address payable public owner;
    uint public trapBlockNumber;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw() public payable {
        require(msg.value != 0, "value cannot be zero");
        require(msg.sender == tx.origin, "caller must be EOA");
        if (block.number < trapBlockNumber || msg.sender == owner) {
            emit Withdrawal(address(this).balance, block.number);
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    function resetTrap(uint blockNumber) public payable {
        require(msg.sender == owner, "You aren't the owner");
        trapBlockNumber = blockNumber;
        emit Trap(blockNumber);
    }

    // needed to add to the balance
    receive() external payable {
    }

}