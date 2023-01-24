//interface DF {
//    function withdraw() external payable;
//}

import "./DarkForestV1.sol";

contract Armorer {

    constructor() {
    }

    function yoink(address payable _addr) public payable {
        (bool success) = _addr.call{value: msg.value, gas: gasleft()}(
            abi.encodeWithSignature("withdraw()")
        );
        require(success, "yoink was not successful");
    }

    // needed to add to the balance
    receive() external payable {
    }

}