// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract TokenStateChannel is Ownable {

    using SafeMath for uint;

    IERC20 public huf_token;

    struct Channel {
        address[2] participants;
        uint256 nonce;
        mapping (address => uint256) token_funds;
        mapping (address => uint256) balances;
        mapping (address => bool) joined;
        mapping (address => bool) withdrawal_status;
    }

    uint public channel_cnt;

    mapping (uint => Channel) public channels;

    event ChannelCreated(address creator, uint channel_id, uint token_deposited);
    event JoinedToChannel(address participant, uint channel_id, uint token_deposited);

    constructor(address _token_address) public {
        huf_token = IERC20(_token_address);
    }

    function createChannel(uint _token_amount) external {
        channel_cnt += 1;
        Channel storage new_channel = channels[channel_cnt];
        new_channel.participants[0] = msg.sender;
        new_channel.joined[msg.sender] = true;
        new_channel.token_funds[msg.sender] = _token_amount;
        
        // transfer tokens to this contract
        require(huf_token.transferFrom(msg.sender, address(this), _token_amount));
        
        // emit channel created event
        emit ChannelCreated(msg.sender, channel_cnt, _token_amount);
    }

    function join(uint _channel_id, uint _token_amount) external {
        channels[_channel_id].participants[1] = msg.sender;
        channels[_channel_id].joined[msg.sender] = true;
        channels[_channel_id].token_funds[msg.sender] = _token_amount;
        
        // transfer tokens to this contract
        require(huf_token.transferFrom(msg.sender, address(this), _token_amount));
        
        // emit joined to channel event
        emit ChannelCreated(msg.sender, channel_cnt, _token_amount);
    }

    function close(uint _token_amount) external {

    }
}