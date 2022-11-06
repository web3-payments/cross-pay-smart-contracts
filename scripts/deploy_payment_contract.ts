import { ethers } from "ethers";
import { initWallet1 } from './utils/initWallet';
import * as paymentContract from "../artifacts/contracts/PaymentContract.sol/PaymentContract.json";

async function main() {
    const signer = await initWallet1();
    console.log("Deploying Payment Contract");
    const pContractFactory = new ethers.ContractFactory(
        paymentContract.abi, 
        paymentContract.bytecode,
        signer
    );
    const pcontract = await pContractFactory.deploy();
    await pcontract.deployed();
    console.log("Completed");
    console.log(`Payment Contract deployed at ${pcontract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
