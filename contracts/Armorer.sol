// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*
Generic front runner contract with balance guarantees
*/
contract Armorer {

    constructor() {
    }

    function yoink(address payable _addr, bytes calldata funcData) public payable {
        uint256 startBalance = address(this).balance;
        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: gasleft()}(
            funcData
        );
        require(success, "yoink was not successful");
        require(address(this).balance > startBalance, "balance was not increased");
        payable(msg.sender).transfer(address(this).balance);
    }

    // needed to add to the balance
    receive() external payable {
    }

}