/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "IUniswapV3MintCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3MintCallback__factory>;
    getContractFactory(
      name: "IUniswapV3SwapCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3SwapCallback__factory>;
    getContractFactory(
      name: "IUniswapV3Factory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3Factory__factory>;
    getContractFactory(
      name: "IUniswapV3Pool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3Pool__factory>;
    getContractFactory(
      name: "IUniswapV3PoolActions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolActions__factory>;
    getContractFactory(
      name: "IUniswapV3PoolDerivedState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolDerivedState__factory>;
    getContractFactory(
      name: "IUniswapV3PoolEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolEvents__factory>;
    getContractFactory(
      name: "IUniswapV3PoolImmutables",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolImmutables__factory>;
    getContractFactory(
      name: "IUniswapV3PoolOwnerActions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolOwnerActions__factory>;
    getContractFactory(
      name: "IUniswapV3PoolState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolState__factory>;
    getContractFactory(
      name: "LiquidityManagement",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LiquidityManagement__factory>;
    getContractFactory(
      name: "PeripheryImmutableState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PeripheryImmutableState__factory>;
    getContractFactory(
      name: "PeripheryPayments",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PeripheryPayments__factory>;
    getContractFactory(
      name: "IWETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH9__factory>;
    getContractFactory(
      name: "IERC721Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Permit__factory>;
    getContractFactory(
      name: "INonfungiblePositionManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.INonfungiblePositionManager__factory>;
    getContractFactory(
      name: "IPeripheryImmutableState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPeripheryImmutableState__factory>;
    getContractFactory(
      name: "IPeripheryPayments",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPeripheryPayments__factory>;
    getContractFactory(
      name: "IPoolInitializer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPoolInitializer__factory>;
    getContractFactory(
      name: "ISwapRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwapRouter__factory>;
    getContractFactory(
      name: "CreditVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CreditVault__factory>;
    getContractFactory(
      name: "DebitVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DebitVault__factory>;
    getContractFactory(
      name: "ERC721securitization",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721securitization__factory>;
    getContractFactory(
      name: "IAaveDebtToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAaveDebtToken__factory>;
    getContractFactory(
      name: "IAaveLendingPool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAaveLendingPool__factory>;
    getContractFactory(
      name: "IAaveProtocolDataProvider",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAaveProtocolDataProvider__factory>;
    getContractFactory(
      name: "ICreditVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICreditVault__factory>;
    getContractFactory(
      name: "IERC721securitization",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721securitization__factory>;
    getContractFactory(
      name: "IEthosERC721DeckWrapper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IEthosERC721DeckWrapper__factory>;
    getContractFactory(
      name: "DateTime",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DateTime__factory>;
    getContractFactory(
      name: "MarketCreation",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MarketCreation__factory>;
    getContractFactory(
      name: "Securitization",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Securitization__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Enumerable>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "IUniswapV3MintCallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3MintCallback>;
    getContractAt(
      name: "IUniswapV3SwapCallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3SwapCallback>;
    getContractAt(
      name: "IUniswapV3Factory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3Factory>;
    getContractAt(
      name: "IUniswapV3Pool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3Pool>;
    getContractAt(
      name: "IUniswapV3PoolActions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolActions>;
    getContractAt(
      name: "IUniswapV3PoolDerivedState",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolDerivedState>;
    getContractAt(
      name: "IUniswapV3PoolEvents",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolEvents>;
    getContractAt(
      name: "IUniswapV3PoolImmutables",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolImmutables>;
    getContractAt(
      name: "IUniswapV3PoolOwnerActions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolOwnerActions>;
    getContractAt(
      name: "IUniswapV3PoolState",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolState>;
    getContractAt(
      name: "LiquidityManagement",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LiquidityManagement>;
    getContractAt(
      name: "PeripheryImmutableState",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PeripheryImmutableState>;
    getContractAt(
      name: "PeripheryPayments",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PeripheryPayments>;
    getContractAt(
      name: "IWETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH9>;
    getContractAt(
      name: "IERC721Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Permit>;
    getContractAt(
      name: "INonfungiblePositionManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.INonfungiblePositionManager>;
    getContractAt(
      name: "IPeripheryImmutableState",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPeripheryImmutableState>;
    getContractAt(
      name: "IPeripheryPayments",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPeripheryPayments>;
    getContractAt(
      name: "IPoolInitializer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPoolInitializer>;
    getContractAt(
      name: "ISwapRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwapRouter>;
    getContractAt(
      name: "CreditVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CreditVault>;
    getContractAt(
      name: "DebitVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DebitVault>;
    getContractAt(
      name: "ERC721securitization",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721securitization>;
    getContractAt(
      name: "IAaveDebtToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAaveDebtToken>;
    getContractAt(
      name: "IAaveLendingPool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAaveLendingPool>;
    getContractAt(
      name: "IAaveProtocolDataProvider",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAaveProtocolDataProvider>;
    getContractAt(
      name: "ICreditVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICreditVault>;
    getContractAt(
      name: "IERC721securitization",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721securitization>;
    getContractAt(
      name: "IEthosERC721DeckWrapper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IEthosERC721DeckWrapper>;
    getContractAt(
      name: "DateTime",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DateTime>;
    getContractAt(
      name: "MarketCreation",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MarketCreation>;
    getContractAt(
      name: "Securitization",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Securitization>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
