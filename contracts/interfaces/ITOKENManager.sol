// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;

interface ITOKENManager {
    function deposit(address _depositor, uint256 _amount) external;
    function withdraw(address _depositor, uint256 _amount) external;
    function lend(address _depositor,uint256 _amount) external;
}