// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// V4
//
// attempt at contract that the frontrunners could fail.
//
// calling the withdraw method is non-deterministic. sometimes the call will succeed, sometimes it will
// return a single wei.
//
// The `withdraw` method restricts the callers to only EOA, so there cannot be any checks to make
// sure the contract is returning funds to the sender, which will be more risky for the front runner.

contract DarkForestV4 {

    bool trapClosed = false;

    event Withdrawal(uint amount, uint when);
    event Trap(bool newTrapState, uint when);
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw() public payable {
        require(msg.value != 0, "value cannot be zero");
        require(msg.sender == tx.origin, "caller must be EOA");
        if (!trapClosed || msg.sender == owner) {
            emit Withdrawal(address(this).balance, block.number);
            payable(msg.sender).transfer(address(this).balance);
            emit Trap(true, block.number);
            trapClosed = true;
        } else {
            emit Withdrawal(1, block.number);
            payable(msg.sender).transfer(1);
        }
    }

    function resetTrap() public {
        require(msg.sender == owner, "You aren't the owner");
        emit Trap(false, block.number);
        trapClosed = false;
    }

    // needed to add to the balance
    receive() external payable {
    }

}