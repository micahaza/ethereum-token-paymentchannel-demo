// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract TokenStateChannel is Ownable {

    IERC20 public hufToken;

    constructor(address _token_address) public {
        hufToken = IERC20(_token_address);
    }

}