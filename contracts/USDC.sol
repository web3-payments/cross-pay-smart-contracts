// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20 {

    constructor() ERC20("USD Coin", "USDC"){
        _mint(msg.sender, 100 * 10 ** decimals());
    }

}
