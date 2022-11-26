import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { PaymentContract } from "../../typechain-types";

describe("PaymentContract", function () {
    let USDC: Contract;
    let paymentContract: PaymentContract;
    let accounts: any[];

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      //PaymentContract
      const paymentContractFactory = await ethers.getContractFactory("PaymentContract");
      paymentContract = await paymentContractFactory.deploy();
      await paymentContract.deployed();
      //ERC20 - USDC
      const usdcFactory = await ethers.getContractFactory("USDC");
      USDC = await usdcFactory.deploy();
      await USDC.deployed();
    });

    describe("when the payment contract is deployed", function () {
        it("has 0 in balance", async function () {
            const balance = await paymentContract.getBalance();
            expect(balance.toNumber()).to.eq(0);
        });
    });

    describe("when a payment is executed in ether", function() {
        it("has a balance of 1.4% of the total paid and withdraw amount", async function() {
            await paymentContract.pay(accounts[1].address, {
                value: ethers.utils.parseEther("1")
            });
            const balance = await paymentContract.getBalance();
            const fees = ethers.utils.parseEther("0.014");
            expect(balance.toString).to.eql(fees.toString);
            const originalBalance =  await ethers.provider.getBalance(accounts[0].address);
            const tx = await paymentContract.withdraw(ethers.utils.parseEther("0.014"), accounts[0].address);
            const receipt = await tx.wait();
            const gasUsed = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice);
            const balanceAfterWithdraw = await ethers.provider.getBalance(accounts[0].address);
            const totalWithdrawn = balanceAfterWithdraw.sub(originalBalance);
            const totalWithdrawnMinusGasFee = fees.sub(gasUsed);
            expect(totalWithdrawn).to.eql(totalWithdrawnMinusGasFee);
        })
    });

    describe("when a payment is executed with ERC20", function() {
        it("has a balance of 1.4% of the total paid and withdraw amount", async function() {
            await USDC.connect(accounts[0]).approve(paymentContract.address, ethers.utils.parseEther("1"));
            await paymentContract.payUsingToken(accounts[1].address, USDC.address, ethers.utils.parseEther("1"));
            const balance = await USDC.balanceOf(paymentContract.address);
            const fees = ethers.utils.parseEther("0.014");
            expect(balance.toString).to.eql(fees.toString);
            const originalBalanceUSDCOwner = await USDC.balanceOf(accounts[0].address);
            await paymentContract.withdrawToken(ethers.utils.parseEther("0.014"), accounts[0].address, USDC.address);
            const balanceAfterWithdraw = await USDC.balanceOf(accounts[0].address);
            const totalWithdrawn = balanceAfterWithdraw - originalBalanceUSDCOwner;
            expect(totalWithdrawn).to.eql(14000000000000000);
        })
    });

});