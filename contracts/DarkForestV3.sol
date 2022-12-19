// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// V3
//
// attempt at contract that the frontrunners could fail.
//
// calling the withdraw method is non-deterministic. sometimes the call will succeed, sometimes it will
// return a single wei.  If the frontrunner contract does not check to make sure the balance before is less
// than the balance after then this contract will steal their funds.  Once a single withdrawal has been
// initiated then the trap is "closed".  The second run through will not return the full balance, instead
// it will return 1 wei.

contract DarkForestV3 {

    bool trapClosed = false;

    event Withdrawal(uint amount, uint when);
    event Trap(bool newTrapState, uint when);
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw() public payable {
        require(msg.value != 0, "value cannot be zero");
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