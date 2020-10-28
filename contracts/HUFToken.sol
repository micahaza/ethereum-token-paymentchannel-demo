// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract HUFToken is ERC20, Ownable {

    constructor() ERC20("HUF Token", "HUF") public {}

    function mint(address _recipient, uint _amount) external {
        _mint(_recipient, _amount);
    }
}