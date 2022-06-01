// SPDX-License-Identifier: MIT
pragma solidity <= 0.8.10;

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Permits } from "../manager/Permits.sol";
import { IContractsProvider } from "../interfaces/IContractsProvider.sol";

import "hardhat/console.sol";

/**
 * @notice the debitor's interface
 */
contract DebitorsVault is Ownable, Permits {

    using SafeERC20 for IERC20;
    IContractsProvider contractsProvider;

    constructor(address _contractsProvider) {
        contractsProvider = IContractsProvider(_contractsProvider);
    }

    function approveLoanP2P (address _creditor, address _debitor, uint256 _amount, bytes32 encodedContract) public hasPermits (_debitor, msg.sender) {
        //send this approve to positions
        //approve by the debitor off chain if there is collateral
    }
 
    function startLoanP2P () public hasPermits() {

    }

    function startLoanGeneric () public hasPermits () {
        
    }
}
