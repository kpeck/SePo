import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { AAVElendingpool, WBTCcontract, WBTCwhale, DAIcontract, DAIwhale, AAVEbtcstabledebt, WETHcontract, WETHwhale, ETHOSerc721deckwrapper } from "./commonRinkeby"; 
import { getTokens } from "./types";
import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { Console } from "console";
import { Signer, utils } from "ethers";

describe("Credit delegation", function () {
  let account= {} as SignerWithAddress;
  let debitor = {} as SignerWithAddress;
  let balance;

  before(async function () {
    //init of variables
    [account, debitor, ] = await ethers.getSigners();
    
    //in un momento in cui ho voglia devo capire come mettere il deploy del contratto qua
    
  });
  
  it("Should deposit DAI on AAVE", async function () {

    //init of variables
    const DAI = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider); // ERC20 contract of USDC

    //fund USDC
    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    //show USDC balance
    balance = await DAI.balanceOf(account.address); // Balance of USDC

    //deploy contract
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //approve funds on contract 
    const ERC20dai = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider);
    await ERC20dai.connect(account).approve(creditVault.address,ethers.utils.parseUnits("50000.0",18));
    //deposit on aave
    await creditVault.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18));

    //show USDC balance
    //balance = await DAI.balanceOf(account.address); // Balance of USDC
    //console.log("USDC BALANCE AFTER DEPOSIT: " + balance.toString());
  
   

  });

  it("Should approve the delegation in BTC", async function () {

    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    
    //deploy contract creditVault
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //deploy contract debitVault
    const DebitVault = await ethers.getContractFactory("DebitVault");
    const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address);
    await debitVault.deployed();

    //set debitVault on creditVault
    await creditVault.connect(account).setDebitVault(debitVault.address);

    //approve credit delegation
    await creditVault.connect(account).approveOnCreditDelegation(ethers.utils.parseUnits("50000.0",18));

  });

  it("Should open a position", async function () {

    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    await getTokens(debitor.address, WETHcontract ,WETHwhale, ethers.utils.parseUnits("50.0",18));

    //deploy contract creditVault
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //deploy contract debitVault
    const DebitVault = await ethers.getContractFactory("DebitVault");
    const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address );
    await debitVault.deployed();

    //set debitVault on creditVault
    await creditVault.connect(account).setDebitVault(debitVault.address);

    //trasfer funds to account
    const ERC20dai = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider);
    await ERC20dai.connect(account).approve(creditVault.address,ethers.utils.parseUnits("50000.0",18));

    //transfer collateral to debitor
    const ERC20weth = new ethers.Contract(WETHcontract, ERC20.abi, ethers.provider);
    await ERC20weth.connect(debitor).approve(debitVault.address,ethers.utils.parseUnits("50.0",18));

    //deposit
    await creditVault.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18));
     
    //open position
    await debitVault.connect(debitor).openPosition(account.address,WBTCcontract,ethers.utils.parseUnits("0.01",8),WETHcontract,ethers.utils.parseUnits("1.0",18),12,2023);

    //await ERC20dai.connect(account).approve(AAVElendingpool,ethers.utils.parseUnits("50000.0",18));
    //const aaveLendingPool=new ethers.Contract(AAVElendingpool, AAVEabi, ethers.provider);
    //await aaveLendingPool.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18),account.address,0);
    //const aaveBtcStableDebt=new ethers.Contract(AAVEbtcstabledebt, AAVEbtcabi, ethers.provider);
    //await aaveBtcStableDebt.connect(account).approveDelegation(debitor.address,ethers.utils.parseUnits("1.0",8))
    //await aaveLendingPool.connect(debitor).borrow(WBTCcontract,ethers.utils.parseUnits("1.0",8),1,0,account.address);

  });

  it("Should withdraw DAI from aave", async function () {

    //init of variables
    const DAI = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider); // ERC20 contract of USDC

    //fund DAI
    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    //show DAI balance
    balance = await DAI.balanceOf(account.address); // Balance of USDC
    //console.log("USDC BALANCE BEFORE DEPOSIT: " + balance.toString());

    //deploy contract
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //approve funds on contract 
    const ERC20dai = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider);
    await ERC20dai.connect(account).approve(creditVault.address,ethers.utils.parseUnits("50000.0",18));
    //deposit on aave
    await creditVault.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18));

    //show DAI balance
    //balance = await DAI.balanceOf(account.address); // Balance of DAI
    //console.log("USDC BALANCE AFTER DEPOSIT: " + balance.toString());

    await creditVault.connect(account).withdraw(DAIcontract);
  

  });

  it("Should repay the position opened", async function () {

    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    await getTokens(debitor.address, WETHcontract ,WETHwhale, ethers.utils.parseUnits("50.0",18));
    await getTokens(debitor.address, WBTCcontract ,WBTCwhale, ethers.utils.parseUnits("0.1",8));


    //deploy contract creditVault
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //deploy contract debitVault
    const DebitVault = await ethers.getContractFactory("DebitVault");
    const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address );
    await debitVault.deployed();

    //set debitVault on creditVault
    await creditVault.connect(account).setDebitVault(debitVault.address);

    //trasfer funds to account
    const ERC20dai = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider);
    await ERC20dai.connect(account).approve(creditVault.address,ethers.utils.parseUnits("50000.0",18));

    //transfer collateral to debitor
    const ERC20weth = new ethers.Contract(WETHcontract, ERC20.abi, ethers.provider);
    await ERC20weth.connect(debitor).approve(debitVault.address,ethers.utils.parseUnits("50.0",18));

    //deposit
    await creditVault.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18));
     
    //open position
    await debitVault.connect(debitor).openPosition(account.address,WBTCcontract,ethers.utils.parseUnits("0.01",8),WETHcontract,ethers.utils.parseUnits("1.0",18),12,2023);

    //repay
    const ERC20wbtc = new ethers.Contract(WBTCcontract, ERC20.abi, ethers.provider);
    await ERC20wbtc.connect(debitor).approve(debitVault.address,ethers.utils.parseUnits("0.1",8));
    await debitVault.connect(debitor).repayDebt(0,account.address,WBTCcontract,ethers.utils.parseUnits("0.1",8));
  });

  it("Should take the collateral", async function () {

    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    await getTokens(debitor.address, WETHcontract ,WETHwhale, ethers.utils.parseUnits("50.0",18));
    await getTokens(debitor.address, WBTCcontract ,WBTCwhale, ethers.utils.parseUnits("0.1",8));


    //deploy contract creditVault
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //deploy contract debitVault
    const DebitVault = await ethers.getContractFactory("DebitVault");
    const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address );
    await debitVault.deployed();

    //set debitVault on creditVault
    await creditVault.connect(account).setDebitVault(debitVault.address);

    //trasfer funds to account
    const ERC20dai = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider);
    await ERC20dai.connect(account).approve(creditVault.address,ethers.utils.parseUnits("50000.0",18));

    //transfer collateral to debitor
    const ERC20weth = new ethers.Contract(WETHcontract, ERC20.abi, ethers.provider);
    await ERC20weth.connect(debitor).approve(debitVault.address,ethers.utils.parseUnits("50.0",18));

    //deposit
    await creditVault.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18));
     
    //open position
    await debitVault.connect(debitor).openPosition(account.address,WBTCcontract,ethers.utils.parseUnits("0.01",8),WETHcontract,ethers.utils.parseUnits("1.0",18),12,2021);

    //repay
    await creditVault.connect(account).takeCollateral(0);
  });
});

describe("Securitization", function () {
  let account= {} as SignerWithAddress;
  let debitor = {} as SignerWithAddress;
  let balance;

  before(async function () {
    //init of variables
    [account, debitor, ] = await ethers.getSigners();
    /*
    //in un momento in cui ho voglia devo capire come mettere il deploy del contratto qua
    */
  });

  it("Should mint nft", async function () {

    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    await getTokens(debitor.address, WETHcontract ,WETHwhale, ethers.utils.parseUnits("50.0",18));
    await getTokens(debitor.address, WBTCcontract ,WBTCwhale, ethers.utils.parseUnits("0.1",8));


    //deploy contract creditVault
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //deploy contract debitVault
    const DebitVault = await ethers.getContractFactory("DebitVault");
    const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address );
    await debitVault.deployed();

    //deploy contract securitization
    const Securitization = await ethers.getContractFactory("Securitization");
    const securitization = await Securitization.connect(account).deploy(creditVault.address ,ETHOSerc721deckwrapper);
    await securitization.deployed();

    //set debitVault on creditVault
    await creditVault.connect(account).setDebitVault(debitVault.address);

    //trasfer funds to account
    const ERC20dai = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider);
    await ERC20dai.connect(account).approve(creditVault.address,ethers.utils.parseUnits("50000.0",18));

    //transfer collateral to debitor
    const ERC20weth = new ethers.Contract(WETHcontract, ERC20.abi, ethers.provider);
    await ERC20weth.connect(debitor).approve(debitVault.address,ethers.utils.parseUnits("50.0",18));

    //deposit
    await creditVault.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18));
     
    //open position
    await debitVault.connect(debitor).openPosition(account.address,WBTCcontract,ethers.utils.parseUnits("0.01",8),WETHcontract,ethers.utils.parseUnits("1.0",18),12,2021);
    
    //create the contract for nfts
    await securitization.connect(account).createContract(0);

    //mint 4 erc721. Divide the position into 4 nft
    let itemId;
    for(let i =0;i<4;i++){
       itemId = await securitization.connect(account).mint(0,ethers.utils.parseUnits("0.0025",8),"someipfsstring");
       //console.log(itemId);
    }
    

  });

  it("Should tokenize a position", async function () {

    await getTokens(account.address, DAIcontract ,DAIwhale, ethers.utils.parseUnits("50000.0",18));
    await getTokens(debitor.address, WETHcontract ,WETHwhale, ethers.utils.parseUnits("50.0",18));
    await getTokens(debitor.address, WBTCcontract ,WBTCwhale, ethers.utils.parseUnits("0.1",8));


    //deploy contract creditVault
    const CreditVault = await ethers.getContractFactory("CreditVault");
    const creditVault = await CreditVault.connect(account).deploy(AAVElendingpool,AAVEbtcstabledebt);
    await creditVault.deployed();

    //deploy contract debitVault
    const DebitVault = await ethers.getContractFactory("DebitVault");
    const debitVault = await DebitVault.connect(account).deploy(AAVElendingpool, creditVault.address );
    await debitVault.deployed();

    //deploy contract securitization
    const Securitization = await ethers.getContractFactory("Securitization");
    const securitization = await Securitization.connect(account).deploy(creditVault.address ,ETHOSerc721deckwrapper);
    await securitization.deployed();

    //set debitVault on creditVault
    await creditVault.connect(account).setDebitVault(debitVault.address);

    //trasfer funds to account
    const ERC20dai = new ethers.Contract(DAIcontract, ERC20.abi, ethers.provider);
    await ERC20dai.connect(account).approve(creditVault.address,ethers.utils.parseUnits("50000.0",18));

    //transfer collateral to debitor
    const ERC20weth = new ethers.Contract(WETHcontract, ERC20.abi, ethers.provider);
    await ERC20weth.connect(debitor).approve(debitVault.address,ethers.utils.parseUnits("50.0",18));

    //deposit
    await creditVault.connect(account).deposit(DAIcontract,ethers.utils.parseUnits("50000.0",18));
     
    //open position
    await debitVault.connect(debitor).openPosition(account.address,WBTCcontract,ethers.utils.parseUnits("0.01",8),WETHcontract,ethers.utils.parseUnits("1.0",18),12,2021);

    //create the contract for the nfts
    await securitization.connect(account).createContract(0);    
    console.log("Securitization in 4 new assets");
    //mint 4 erc721. Divide the position into 4 nft and convert them into items on ethos
    let itemId;
    for(let i =0;i<4;i++){
       itemId = await securitization.connect(account).tokenizePosition(0,ethers.utils.parseUnits("0.0025",8),account.address,"someipfsstring");
       //console.log(itemId);
    }
    

  });

  
});
