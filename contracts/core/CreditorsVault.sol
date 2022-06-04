// SPDX-License-Identifier: MIT
pragma solidity <= 0.8.10;

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Permits } from "../manager/Permits.sol";
import { IContractsProvider } from "../interfaces/IContractsProvider.sol";
import { ITOKENManager } from "../interfaces/ITOKENManager.sol";


import "hardhat/console.sol";

/**
 * @notice the creditor's interface
 */
contract CreditorsVault is Ownable, Permits{

    event depositSuccessfull (address, uint256, address);
    event withdrawSuccesfull (address, uint256, address);

    using SafeERC20 for IERC20;
    IContractsProvider contractsProvider;
    ITOKENManager TOKENManager;
    mapping (address => address) tokenManager;
    
    constructor(address _contractsProvider) {
        contractsProvider = IContractsProvider(_contractsProvider);
    }

    function setPairTokenContracts (address _token, address _manager) public onlyOwner {
        tokenManager[_token]=_manager;
    }

    function deposit (address _depositor, uint256 _amount, address _token) public hasPermits (_depositor, msg.sender) {
        TOKENManager(tokenManager[_token]).deposit(_depositor,_amount);
        emit depositSuccessfull(_depositor,_amount,_token);
    }

    function withdraw (address _depositor, uint256 _amount, address _token) public hasPermits (_depositor, msg.sender) {
        TOKENManager(tokenManager[_token]).withdraw(_depositor,_amount);
        emit withdrawSuccesfull(_depositor, _amount, _token);
    }

    function approveLoanP2P (address _creditor, address _debitor, uint256 _amount, bytes32 encodedContract) public hasPermits (_creditor, msg.sender) {
        
        //send this approve to positions
        //approve by the creditor off chain
    }

    function approveLoanGeneric () public hasPermits (){

    }

    function replicateLoan () public hasPermits () {
        
    }

    function startLoanP2P () public hasPermits() {

    }

}
