// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DailyTokenClaim {
    IERC20 public token;
    address public owner;
    uint256 public claimAmount = 1_000_000_000_000_000; // 0.001 tokens (18 decimals)

    mapping(address => uint256) public lastClaimed;

    constructor() {
        token = IERC20(0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed);
        owner = msg.sender;
    }

    function claim() external {
        require(block.timestamp >= lastClaimed[msg.sender] + 1 days, "Already claimed today");
        lastClaimed[msg.sender] = block.timestamp;

        require(token.transfer(msg.sender, claimAmount), "Token transfer failed");
    }

    function setClaimAmount(uint256 newAmount) external {
        require(msg.sender == owner, "Only owner can set amount");
        claimAmount = newAmount;
    }

    function getContractTokenBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function depositTokens(uint256 amount) external {
        require(msg.sender == owner, "Only owner can deposit");
        require(token.transferFrom(msg.sender, address(this), amount), "Token deposit failed");
    }
}
