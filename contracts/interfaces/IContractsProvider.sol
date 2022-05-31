// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;

interface IContractsProvider {
    function getAddresses () external view returns (
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
    );
    function getAddress (uint256 _cod) external view returns (address);
}