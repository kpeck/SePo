// SPDX-License-Identifier: MIT
pragma solidity <= 0.8.10;

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Permits } from "../manager/Permits.sol";
import { IContractsProvider } from "../interfaces/IContractsProvider.sol";
import { ITOKENManager } from "../interfaces/ITOKENManager.sol";
import { ICreditorsVault } from "../interfaces/ICreditorsVault.sol";
import { IDebitorsVault } from "../interfaces/IDebitorsVault.sol";


contract Positions is Ownable{
    
    using SafeERC20 for IERC20;
    IContractsProvider contractsProvider;
    ICreditorsVault creditorsVault;
    IDebitorsVault debitorsVault;
    ITOKENManager TOKENManager;
    mapping (address => address) tokenManager;

    struct contractsDataP2P{
        address creditor;
        bool creditorApprove;
        address debitor;
        bool debitorApprove;
    }
    mapping (bytes32 => contractsDataP2P) contractsP2P;

    struct contractsDataGeneric{
        address creditor;
        bool creditorApprove;
        uint256 amount;
        uint256 lended;
    }
    mapping (bytes32 => contractsDataGeneric) contractsGeneric;
    
    constructor (address _contractsProvider) {
        contractsProvider = IContractsProvider(_contractsProvider);
    }

    modifier callerCreditorsVault() {
        require(
            contractsProvider.getAddress(1)== msg.sender,
             Errors.CALLER_WITH_NO_REQUIREMENTS
        ); //1 = creditorVault
        _;
    } 

    modifier callerDebitorsVault() {
        require(
            contractsProvider.getAddress(2)== msg.sender,
             Errors.CALLER_WITH_NO_REQUIREMENTS
        ); //2 = debitorVault
        _;
    } 

    function setPairTokenContracts(address _token, address _manager) public onlyOwner {
        tokenManager[_token]=_manager;
    }

    function setVaults(address _creditorsVault, address _debitorsVault) public onlyOwner {
        creditorsVault = ICreditorsVault(_creditorsVault);
        debitorsVault = IDebitorsVault(_debitorsVault);
    }

    function approveByCreditorP2P(bytes32 _encodedContract, address _creditor) public callerCreditorsVault {
        // decode _encodedContract and check that the creditor match with the caller

        //update mapping contract 
    }

    function approveByDebitorP2P(bytes32 _encodedContracts, address _debitor) public callerDebitorsVault {
        
    }

    function createContractP2P() public {
        //require caller creditorvault or debitorvault
    }

    function createContractByDebitorGeneric() public callerDebitorsVault {
        //permits to have a loan based on the possession of one nft for example
    }

    
}