// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// V2
//
// this makes the `withdraw` method "payable".  A front runner would see a transactions with a "value".  This would
// determine whether the frontrunner are willing to risk their own funds to steal the contract funds.
// the withdraw method must be sent funds or it will fail.
contract DarkForestV2 {

    event Withdrawal(uint amount, uint when);

    constructor() payable {

    }

    function withdraw() public payable {
        require(msg.value != 0, "value cannot be zero");
        emit Withdrawal(address(this).balance, block.timestamp);
        payable(msg.sender).transfer(address(this).balance);
    }

    // needed to add to the balance
    receive() external payable {
    }
}