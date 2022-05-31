// SPDX-License-Identifier: MIT
pragma solidity <= 0.8.10;

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IContractsProvider } from "../interfaces/IContractsProvider.sol";
import { Errors } from "../helpers/Errors.sol";


import "hardhat/console.sol";

/**
 * @notice the creditor's interface
 */
contract CreditorsVault is Ownable{

    using SafeERC20 for IERC20;
    IContractsProvider contractsProvider;
    
   
    mapping (address => address) private contracts;
    
          
    constructor(address _contractsProvider) {
        contractsProvider = IContractsProvider(_contractsProvider);
    }

    function setTokenContracts (uint256 _codDai, uint256 _codUSDC,uint256 _codWBTC,uint256 _codWETH) public onlyOwner {

    }

    
    




}
