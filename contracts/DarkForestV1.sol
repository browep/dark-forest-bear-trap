// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// V1
//
// very simplistic contract, no safeguards.  easy to front run, very little risk for the frontrunner.
contract DarkForestV1 {

    event Withdrawal(uint amount, uint when);

    constructor() payable {
    }

    function withdraw() public {
        emit Withdrawal(address(this).balance, block.timestamp);
        payable(msg.sender).transfer(address(this).balance);
    }

    // needed to add to the balance
    receive() external payable {
    }

}