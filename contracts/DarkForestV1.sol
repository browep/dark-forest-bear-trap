// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DarkForestV1 {

    event Withdrawal(uint amount, uint when);

    constructor() payable {
    }

    function withdraw() public {
        emit Withdrawal(address(this).balance, block.timestamp);
        payable(msg.sender).transfer(address(this).balance);
    }

}