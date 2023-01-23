contract Armorer {

    uint256 public a;

    constructor() {
        a = 1;
    }

    function getA() public view returns (uint256) {
        return a;
    }
}