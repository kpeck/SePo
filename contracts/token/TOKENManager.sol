// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;

//openzeppelin
import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IContractsProvider } from "../interfaces/IContractsProvider.sol";
import { Errors } from "../helpers/Errors.sol";


contract TOKENManager is Ownable{
      
    using SafeERC20 for IERC20;
    IContractsProvider contractsProvider;
    address private token;

    struct lines{
        uint256 aavedeposited;
        uint256 aavelended;
        uint256 stddeposited;
        uint256 stdlended;
    }
    mapping (address => lines) private creditLines;

    
    constructor (address _contractsProvider, address _token) {
        contractsProvider = IContractsProvider(_contractsProvider);
        token = _token;
    }

    modifier callerCreditVault() {
        require(
            contractsProvider.getAddress(1)== msg.sender,
             Errors.CALLER_WITH_NO_REQUIREMENTS
        ); //1 = creditorVault
        _;
    }

    modifier callerPositions() {
        require(
            contractsProvider.getAddress(5)== msg.sender,
             Errors.CALLER_WITH_NO_REQUIREMENTS
        ); //10 = positions
        _;
    }

    function setContractsProvider(address _contractsProvider) public onlyOwner {
        contractsProvider = IContractsProvider(_contractsProvider);
    }

    function setDAIaddress(address _DAItoken) public onlyOwner {
        token = _DAItoken;
    }

    function deposit(address _depositor, uint256 _amount) public callerCreditVault {
        IERC20(token).safeTransferFrom(_depositor, address(this), _amount);
        creditLines[_depositor].aavedeposited+=_amount;
    }

    function withdraw(address _depositor, uint256 _amount) public callerCreditVault {
        require(
            (creditLines[_depositor].stddeposited - creditLines[_depositor].stdlended) >= _amount,
            Errors.NOT_ENOUGH_AMOUNT_DEPOSITED_FREE_FOR_WITHDRAW
        );
        IERC20(token).safeTransfer(_depositor, _amount);
        creditLines[_depositor].stddeposited-=_amount;
    }
 
    function lend(address _depositor,uint256 _amount) public callerPositions {
        require(
            (creditLines[_depositor].stddeposited-creditLines[_depositor].stdlended)>=_amount,
            Errors.NOT_ENOUGH_AMOUNT_STDLOAN
        );
        IERC20(token).safeTransfer(msg.sender, _amount);
        creditLines[_depositor].stdlended+=_amount;
    }


    

   
}