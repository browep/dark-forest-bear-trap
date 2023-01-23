contract Armorer {

    uint256 public a;
    address public owner;

    constructor() {
        a = 1;
        owner = msg.sender;
    }

    function getA() public view returns (uint256) {
        return a;
    }

    function yoink(address payable _addr) public payable {
        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: gasleft()}(
            abi.encodeWithSignature("withdraw()", "call foo", 123)
        );
    }
}