// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;

//openzeppelin
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Errors } from "../helpers/Errors.sol";


contract Permits is Ownable {
    
    mapping (address => mapping (address => bool) procurators;

    function setPermit (address _onBehalfOf, address _procurator) public {
        require (
            msg.sender == _onBehalfOf || msg.sender == owner(),
            Errors.CALLER_WITH_NO_REQUIREMENTS
        );
        procurators[_onBehalfOf][_procurator] = true;
    }

    function revokePermit (address _onBehalfOf, address _procurator) public {
        require (
            msg.sender == _onBehalfOf || msg.sender == owner(),
            Errors.CALLER_WITH_NO_REQUIREMENTS
        );
        procurators[_onBehalfOf][_procurator] = false;
    }

    modifier hasPermits(address _onBehalfOf, address _procurator) {
        require(
            msg.sender == _onBehalfOf || procurators[_onBehalfOf][_procurator]== true, 
            Errors.CALLER_WITH_NO_REQUIREMENTS
        );
        _;
    }
}