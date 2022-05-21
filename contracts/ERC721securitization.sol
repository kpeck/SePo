// SPDX-License-Identifier: MIT
pragma solidity <=0.8.10;


import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";


contract ERC721securitization is Ownable, ERC721{

    uint256 private id;
    constructor () ERC721("Securities", "Sec"){
        id=0;
    }

    function mint (string memory _tokenURI) public returns (uint256){
        id++;
        _mint(msg.sender,id);
        _setTokenURI(id, _tokenURI);
        return id;
    }
}
