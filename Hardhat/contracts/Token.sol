// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Token{
    string public name = "Hardhat token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;
    mapping(address=>uint) balances;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
    function transfer(address to, uint amount) external{
        require(balances[msg.sender]>=amount,"not enough token");
        balances [msg.sender]-= amount;
        balances[to]+=amount;
    }

    function balanceOf(address account) external view returns(uint){
        return balances[account];
    }

}