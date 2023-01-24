interface DF {
    function withdraw() external;
}

contract Armorer {

    constructor() {
    }

    function yoink(address payable _addr) public payable {
//        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: gasleft()}(
//            abi.encodeWithSignature("withdraw()")
//        );
        DF(_addr).withdraw();

//        require(success, "yoink was not successful");
    }
}