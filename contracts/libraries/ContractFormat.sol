// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IContractsProvider } from "../interfaces/IContractsProvider.sol";
import { Errors } from "../helpers/Errors.sol";


contract ContractFormat is Ownable {
    using SafeERC20 for IERC20;
    IContractsProvider contractsProvider;
    struct _collateral {
        address token;
        uint256 amount;
        uint256 ltv;
    }
    struct _installment {
        uint256 amount;
        uint256 cadency;
        bool interestType; 
        uint256 interest;
    }

    address private creditor;
    address private debitor;
    address private token;
    uint256 private amount;
    uint256 private startingDate;
    bool private interestType;
    uint256 private interest;
    bool private maturity;
    uint256 private maturityDate;

    bool private collateralized;
    _collateral private collateral;  
    bool private installmentsPayment;
    _installment private installment;
    

    constructor (bytes memory _encodedContract) {
        (creditor,
        debitor,
        token,
        amount,
        startingDate,
        interestType,
        interest,
        maturityDate,
        collateral.token,
        collateral.amount,
        collateral.ltv,
        installment.amount,
        installment.cadency,
        installment.interestType,
        installment.interest) = abi.decode(_encodedContract,(address,address,address,uint256,uint256,bool,uint256,uint256,address,uint256,uint256,uint256,uint256,bool,uint256));

        if(maturityDate!=0){
            maturity=true;
        }
        else{
            maturity=false;
        }
        if(collateral.amount!=0){
            collateralized=true;
        }
        else{
            collateralized=false;
        }
        if(installment.amount!=0){
            installmentsPayment=true;
        }
        else{
            installmentsPayment=false;
        }

    }

}