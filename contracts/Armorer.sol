// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*
Generic front runner contract with balance guarantees
*/
contract Armorer {

    constructor() {
    }

    function yoink(address payable _addr, bytes calldata funcData) public payable {
        // grab the starting balance for comparison
        uint256 startBalance = address(this).balance;
        // execute the call to the specified contract
        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: gasleft()}(
            funcData
        );

        // expect the call to be successful
        require(success, "yoink was not successful");
        // get the ending balance for comparison
        uint256 endBalance = address(this).balance;
        // the call to the other contract should have increased this contracts balance
        require(endBalance > startBalance, "balance was not increased");
        // send funds to the account that invoked this
        payable(msg.sender).transfer(address(this).balance);
    }

    // needed to add to the balance
    receive() external payable {
    }

}