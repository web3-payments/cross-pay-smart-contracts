import { expect } from "chai";
import { ethers } from "hardhat";
import { PaymentContract } from "../../typechain-types";

describe("PaymentContract", function () {
    let paymentContract: PaymentContract;
    let accounts: any[];

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      const paymentContractFactory = await ethers.getContractFactory("PaymentContract");
      paymentContract = await paymentContractFactory.deploy();
      await paymentContract.deployed();
    });

    describe("when the contract is deployed", function () {
        it("has 0 in balance", async function () {
            const balance = await paymentContract.getBalance();
            expect(balance.toNumber()).to.eq(0);
        });
    });

});