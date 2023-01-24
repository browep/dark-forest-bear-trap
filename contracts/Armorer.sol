// SPDX-License-Identifier: MIT

contract Armorer {

    constructor() {
    }

    function yoink(address payable _addr) public payable {
        uint256 startBalance = address(this).balance;
        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: gasleft()}(
            abi.encodeWithSignature("withdraw()")
        );
        require(success, "yoink was not successful");
        require(address(this).balance > startBalance, "balance was not increased");
    }

    // needed to add to the balance
    receive() external payable {
    }

}