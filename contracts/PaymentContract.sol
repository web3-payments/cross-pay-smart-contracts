// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract PaymentContract is AccessControl {

    address private _owner;

    constructor() {
        _owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    function pay(address payable _to) public payable {
        uint256 amountToPay = msg.value;
        require((amountToPay / 10000) * 10000 == amountToPay, 'too small amount');
        uint256 serviceFee = amountToPay * 140 / 10000;
        uint256 amount = amountToPay - serviceFee;
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function withdraw(uint256 amount, address _to) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(DEFAULT_ADMIN_ROLE, _to), "Only owner address is allowed to receive the fees");
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

}