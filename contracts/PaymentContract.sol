// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PaymentContract is AccessControl {

    event Paid(address indexed sender, address indexed receiver, uint256 amount, address indexed token, uint256 serviceFee);
    event Withdraw(address indexed receiver, address indexed token, uint256 amount);

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

    function payUsingToken(address payable _to, address _ERC20tokenAddress, uint256 _amountToPay) public {
        require((_amountToPay / 10000) * 10000 == _amountToPay, 'too small amount');
        IERC20 token = IERC20(_ERC20tokenAddress);
        uint256 serviceFee = _amountToPay * 140 / 10000;
        uint256 amount = _amountToPay - serviceFee;
        token.transferFrom(msg.sender, _to, amount);
        token.transferFrom(msg.sender, address(this), serviceFee);
        emit Paid(msg.sender, _to, amount, _ERC20tokenAddress, serviceFee);
    }

    function withdraw(uint256 amount, address _to) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(DEFAULT_ADMIN_ROLE, _to), "Only owner address is allowed to receive the fees");
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
    
    function withdrawToken(uint256 amount, address _to, address _ERC20tokenAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(DEFAULT_ADMIN_ROLE, _to), "Only owner address is allowed to receive the fees");
        IERC20 token = IERC20(_ERC20tokenAddress);
        token.transfer(_to, amount);
        emit Withdraw(_to, _ERC20tokenAddress, amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

}