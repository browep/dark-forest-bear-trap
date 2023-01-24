// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// V1
//
// very simplistic contract, no safeguards.  easy to front run, very little risk for the frontrunner.
contract DarkForestV1 {

    event Withdrawal(uint amount, uint when);

    constructor() payable {
    }

    function withdraw() external payable returns(uint256) {
        uint256 currentBalance = address(this).balance;
        emit Withdrawal(currentBalance, block.timestamp);
        payable(msg.sender).transfer(currentBalance);
        return currentBalance;
    }

    // needed to add to the balance
    receive() external payable {
    }

}