import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";

import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { AAVElendingpool, WBTCcontract, WBTCwhale, DAIcontract, DAIwhale, AAVEbtcstabledebt, WETHcontract, WETHwhale, ETHOSerc721deckwrapper } from "../test/commonRinkeby"; 
import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { Console } from "console";

task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts: Signer[] = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});


task("deposit", "the creditor a deposits an amount of DAI on aave", async (_taskArgs, hre) => {

  console.log(".");
  console.log("The creditor ALICE deposits an amount of DAI on aave");
  console.log(".");

  let account= {} as SignerWithAddress;
  let debitor = {} as SignerWithAddress;
  let balance;
  
  [account, debitor, ] = await hre.ethers.getSigners();

  //init of variables
  const DAI = new hre.ethers.Contract(DAIcontract, ERC20.abi, hre.ethers.provider); // ERC20 contract of USDC

  //fund USDC  
  await hre.ethers.provider.send("hardhat_impersonateAccount", [DAIwhale]);
  const impersonatedAccount = hre.ethers.provider.getSigner(DAIwhale);
  await DAI.connect(impersonatedAccount).transfer(account.address, hre.ethers.utils.parseUnits("50000.0",18));  //show USDC balance
  balance = await DAI.balanceOf(account.address); // Balance of USDC
  console.log("ALICE amount of DAI before deposit: "+ balance);
  console.log(".");

  //deploy contract
  const CreditVault = await hre.ethers.getContractFactory("CreditVault");
  const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
  await creditVault.deployed();

  //approve funds on contract 
  const ERC20dai = new hre.ethers.Contract(DAIcontract, ERC20.abi, hre.ethers.provider);
  await ERC20dai.connect(account).approve(creditVault.address,hre.ethers.utils.parseUnits("50000.0",18));
  //deposit on aave
  await creditVault.connect(account).deposit(DAIcontract,hre.ethers.utils.parseUnits("50000.0",18));
  balance = await DAI.balanceOf(account.address); // Balance of USDC
  console.log("ALICE amount of DAI after deposit: "+ balance);
  
});




task("opennewposition", "the debitor open a new position", async (_taskArgs, hre) => {

  console.log(".");
  console.log("The debitor BOB take a loan directly from creditor Alice through credit delegation");
  console.log(".");
  console.log("The contracts terms for take the debt for BOB with Alice are:");
  console.log("ltv 80%:");
  console.log("collateral to deposit: WBTC")
  console.log(".")
  console.log("Bob decide to borrow WETH with the above terms");




  let account= {} as SignerWithAddress;
  let debitor = {} as SignerWithAddress;
  let balance;
  
  [account, debitor, ] = await hre.ethers.getSigners();

  //init of variables
  const DAI = new hre.ethers.Contract(DAIcontract, ERC20.abi, hre.ethers.provider); // ERC20 contract of DAI
  const WETH = new hre.ethers.Contract(WETHcontract, ERC20.abi, hre.ethers.provider); // ERC20 contract of WETH
  const WBTC = new hre.ethers.Contract(WBTCcontract, ERC20.abi, hre.ethers.provider); // ERC20 contract of WBTC

  //fund USDC  
  await hre.ethers.provider.send("hardhat_impersonateAccount", [DAIwhale]);
  let impersonatedAccount = hre.ethers.provider.getSigner(DAIwhale);
  await DAI.connect(impersonatedAccount).transfer(account.address, hre.ethers.utils.parseUnits("50000.0",18));  //show DAI balance
  balance = await DAI.balanceOf(account.address); // Balance of DAI

  //fund WETH  
  await hre.ethers.provider.send("hardhat_impersonateAccount", [WETHwhale]);
  impersonatedAccount = hre.ethers.provider.getSigner(WETHwhale);
  await WETH.connect(impersonatedAccount).transfer(debitor.address, hre.ethers.utils.parseUnits("50.0",18));  
  balance = await WETH.balanceOf(account.address); // Balance of USDC


  balance = await WBTC.balanceOf(debitor.address); // Balance of USDC
  console.log("BOB amount of WETH (the token desired) before the loan: "+ balance);
  balance = await WETH.balanceOf(debitor.address); // Balance of USDC
  console.log("BOB amount of WBTC (collateral) before the loan: "+ balance);
  console.log(".");

  //deploy contract creditVault
  const CreditVault = await hre.ethers.getContractFactory("CreditVault");
  const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
  await creditVault.deployed();

  //deploy contract debitVault
  const DebitVault = await hre.ethers.getContractFactory("DebitVault");
  const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address );
  await debitVault.deployed();

  //set debitVault on creditVault
  await creditVault.connect(account).setDebitVault(debitVault.address);

  //trasfer funds to account
  const ERC20dai = new hre.ethers.Contract(DAIcontract, ERC20.abi, hre.ethers.provider);
  await ERC20dai.connect(account).approve(creditVault.address,hre.ethers.utils.parseUnits("50000.0",18));

  //transfer collateral to debitor
  const ERC20weth = new hre.ethers.Contract(WETHcontract, ERC20.abi, hre.ethers.provider);
  await ERC20weth.connect(debitor).approve(debitVault.address,hre.ethers.utils.parseUnits("50.0",18));

  //deposit
  await creditVault.connect(account).deposit(DAIcontract,hre.ethers.utils.parseUnits("50000.0",18));
   
  //open position
  await debitVault.connect(debitor).openPosition(account.address,WBTCcontract,hre.ethers.utils.parseUnits("0.01",8),WETHcontract,hre.ethers.utils.parseUnits("1.0",18),12,2023);
  
  balance = await WBTC.balanceOf(debitor.address); // Balance of USDC
  console.log("BOB amount of WETH (the token desired) after the loan: "+ balance);
  balance = await WETH.balanceOf(debitor.address); // Balance of USDC
  console.log("BOB amount of WBTC (collateral) after the loan: "+ balance);
});


task("securitizeposition", "the creditor securitize the credit", async (_taskArgs, hre) => {

  console.log(".");
  console.log("The creditor ALICE wants to securitize her credit and assign it to other buyers");
  console.log(".");

  console.log("For doing it:");
  console.log("at first the credit is transformed in NFT for save all the informative prospect as metadata");
  console.log("and next the nfts are transformed in ERC20 tokens in order to sell them on a dex");

  let account= {} as SignerWithAddress;
  let debitor = {} as SignerWithAddress;
  let balance;
  
  [account, debitor, ] = await hre.ethers.getSigners();

  //init of variables
  const DAI = new hre.ethers.Contract(DAIcontract, ERC20.abi, hre.ethers.provider); // ERC20 contract of DAI
  const WETH = new hre.ethers.Contract(WETHcontract, ERC20.abi, hre.ethers.provider); // ERC20 contract of WETH
  const WBTC = new hre.ethers.Contract(WBTCcontract, ERC20.abi, hre.ethers.provider); // ERC20 contract of WBTC

  //fund USDC  
  await hre.ethers.provider.send("hardhat_impersonateAccount", [DAIwhale]);
  let impersonatedAccount = hre.ethers.provider.getSigner(DAIwhale);
  await DAI.connect(impersonatedAccount).transfer(account.address, hre.ethers.utils.parseUnits("50000.0",18));  //show DAI balance
  balance = await DAI.balanceOf(account.address); // Balance of DAI

  //fund WETH  
  await hre.ethers.provider.send("hardhat_impersonateAccount", [WETHwhale]);
  impersonatedAccount = hre.ethers.provider.getSigner(WETHwhale);
  await WETH.connect(impersonatedAccount).transfer(debitor.address, hre.ethers.utils.parseUnits("50.0",18));  
  balance = await WETH.balanceOf(account.address); // Balance of WETH

  //fund WBTC  
  await hre.ethers.provider.send("hardhat_impersonateAccount", [WBTCwhale]);
  impersonatedAccount = hre.ethers.provider.getSigner(WBTCwhale);
  await WBTC.connect(impersonatedAccount).transfer(debitor.address, hre.ethers.utils.parseUnits("50.0",18));  
  balance = await WBTC.balanceOf(account.address); // Balance of WBTC


  //deploy contract creditVault
  const CreditVault = await hre.ethers.getContractFactory("CreditVault");
  const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
  await creditVault.deployed();

  //deploy contract debitVault
  const DebitVault = await hre.ethers.getContractFactory("DebitVault");
  const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address );
  await debitVault.deployed();

  //deploy contract securitization
  const Securitization = await hre.ethers.getContractFactory("Securitization");
  const securitization = await Securitization.connect(account).deploy(creditVault.address ,ETHOSerc721deckwrapper);
  await securitization.deployed();


  //set debitVault on creditVault
  await creditVault.connect(account).setDebitVault(debitVault.address);

  //trasfer funds to account
  const ERC20dai = new hre.ethers.Contract(DAIcontract, ERC20.abi, hre.ethers.provider);
  await ERC20dai.connect(account).approve(creditVault.address,hre.ethers.utils.parseUnits("50000.0",18));

  //transfer collateral to debitor
  const ERC20weth = new hre.ethers.Contract(WETHcontract, ERC20.abi, hre.ethers.provider);
  await ERC20weth.connect(debitor).approve(debitVault.address,hre.ethers.utils.parseUnits("50.0",18));

  //deposit
  await creditVault.connect(account).deposit(DAIcontract,hre.ethers.utils.parseUnits("50000.0",18));
   
  //open position
  await debitVault.connect(debitor).openPosition(account.address,WBTCcontract,hre.ethers.utils.parseUnits("0.01",8),WETHcontract,hre.ethers.utils.parseUnits("1.0",18),12,2023);
  

  //create the contract for the nfts
  await securitization.connect(account).createContract(0);    

  //mint 4 erc721. Divide the position into 4 nft and convert them into items on ethos
  let itemId;
  for(let i =0;i<4;i++){
     itemId = await securitization.connect(account).tokenizePosition(0,hre.ethers.utils.parseUnits("0.0025",8),account.address,"someipfsstring");
     //console.log(itemId);
  }
});
