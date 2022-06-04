// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { DateTime } from "../libraries/DateTime.sol";
import { IContractsProvider } from "../interfaces/IContractsProvider.sol";
import { Errors } from "../helpers/Errors.sol";



contract EncodeContract is Ownable, DateTime{
    
    IContractsProvider contractsProvider;
    mapping (address => bool) tokens;

    constructor (address _contractsProvider) {
        contractsProvider = IContractsProvider(_contractsProvider);
    }

    function setToken(address _token) public onlyOwner {
        tokens[_token]=true;
    }

    function unsetToken(address _token) public onlyOwner {
        tokens[_token]=false;
    }

    function _checkEncode (bytes memory _encodedContract) public view returns (bool) {
        require(
            msg.sender == contractsProvider.getAddress(1) || msg.sender == contractsProvider.getAddress(2),
            Errors.CALLER_WITH_NO_REQUIREMENTS
        );

        (address _creditor,
        address _debitor,
        address _token,
        uint256 _amount,
        uint256 _startingDate,
        ,
        ,
        uint256 _maturityDate,
        ,
        ,
        uint256 _ltvCollateral,
        uint256 _amountInstallment,
        ,
        ,
        ) = abi.decode(_encodedContract,(address,address,address,uint256,uint256,bool,uint256,uint256,address,uint256,uint256,uint256,uint256,bool,uint256));


        require(
            _creditor!=_debitor,
            "CREDITOR IS EQUAL TO DEBITOR"
        );
        require(
            _amount>0,
            "AMOUNT EQUAL TO 0"
        );
        require(
            tokens[_token],
            "TOKEN NOT POSSIBLE TO LEND"
        );
        require(
            getYear(_startingDate)>2000,
            "PROBLEM WITH THE STARTING YEAR"
        );
        require(
            getMonth(_startingDate)<=12 && getMonth(_startingDate)>=1,
            "PROBLEM WITH THE STARTING MONTH"
        );
        require(
            getDay(_startingDate)<=31 && getDay(_startingDate)>=1,
            "PROBLEM WITH THE STARTING DAY"
        );
        if(_maturityDate!=0){
            require(
                getYear(_maturityDate)>getYear(block.timestamp) || 
                (getYear(_maturityDate)==getYear(block.timestamp) && getMonth(_maturityDate)>getMonth(block.timestamp)) || 
                (getYear(_maturityDate)==getYear(block.timestamp) && getMonth(_maturityDate)==getMonth(block.timestamp) && getDay(_maturityDate)>getDay(block.timestamp)),
                "THE MATURITY DATE IS NOT IN THE FUTURE"
            );    
            require(
                getMonth(_maturityDate)<=12 && getMonth(_maturityDate)>=1,
                "PROBLEM WITH THE MATURITY MONTH"
            );
            require(
                getDay(_maturityDate)<=31 && getDay(_maturityDate)>=1,
                "PROBLEM WITH THE MATURITY DAY"
            );     
        }
        require(
            _ltvCollateral<=100,
            "LOAN TO VALUE INCORRECT"
        );
        require(
            _amountInstallment<_amount,
            "AMOUNT OF INSTALLMENT NOT VALID"
        );
        
        return true;
        
    }

}