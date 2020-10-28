// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract TokenStateChannel is Ownable {

    using SafeMath for uint;

    IERC20 public hufToken;

    address participant1;
    address participant2;
    uint256 nonce;
    // uint256 challengePeriod;
    // uint256 challengeExpDate;
    mapping (address => uint256) funds;
    mapping (address => uint256) balances;
    mapping (address => bool) joined;
    mapping (address => bool) withdrawStatus;

    constructor(address _token_address) public {
        hufToken = IERC20(_token_address);
    }

    function createChannel(address _participant, uint _token_amount) external {

    }

    function joinChannel(uint _token_amount) external {

    }
}