// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;

//openzeppelin
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";


contract ContractsProvider is Ownable {

    mapping (uint256 => address) private addresses;
    
    event newAddress (uint256 _cod, address _address);
    event newAddresses (address _owner);
    
    //sepo core
    // creditorsVault 1
    // debitorsVault 2
    // securitization 3
    // auction 4
    // positions 5

    //sepo manager
    // permits 6

    //sepo token
    // DAIManager 7
    // USDCManager 8
    // WBTCManager 9
    // WETHManager 10

    //sepo errors
    // errors 11

    //sepo actions
    // agglomeration 12
    // interests 13
    // ipfsOracle 14

    //sepo libraries
    // contractFormat 15
    // datetime 16
    // ERC721Securitization 17

    function setAddresses (
        address _creditorsVault,
        address _debitorsVault,
        address _securitization,
        address _auction,
        address _positions,
        address _permits,
        address _DAIManager,
        address _USDCManager,
        address _WBTCManager,
        address _WETHManager,
        address _errors,
        address _agglomeration,
        address _interests,
        address _ipfsOracle,
        address _contractFormat,
        address _datetime,
        address _ERC721Securitization)
        public onlyOwner{
            addresses[1]= _creditorsVault;
            addresses[2]= _debitorsVault;
            addresses[3]= _securitization;
            addresses[4]= _auction;
            addresses[5]= _positions;
            addresses[6]= _permits;
            addresses[7]= _DAIManager;
            addresses[8]= _USDCManager;
            addresses[9]= _WBTCManager;
            addresses[10]= _WETHManager;
            addresses[11]= _errors;
            addresses[12]= _agglomeration;
            addresses[13]= _interests;
            addresses[14]= _ipfsOracle;
            addresses[15]= _contractFormat;
            addresses[16]= _datetime;
            addresses[17]= _ERC721Securitization;

            emit newAddresses (msg.sender);
        }

        function setAddress (uint256 _cod, address _address) public onlyOwner {
            addresses[_cod] = _address;
            emit newAddress(_cod,_address);
        }

        function getAddresses () public view returns (
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            address
        )        
        {
            return (
                addresses[1],
                addresses[2],
                addresses[3],
                addresses[4],
                addresses[5],
                addresses[6],
                addresses[7],
                addresses[8],
                addresses[9],
                addresses[10],
                addresses[11],
                addresses[12],
                addresses[13],
                addresses[14],
                addresses[15],
                addresses[16],
                addresses[17]
            );
        }

        function getAddress (uint256 _cod) public view returns (address) {
            return addresses[_cod];
        }


}