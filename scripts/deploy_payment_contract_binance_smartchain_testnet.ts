import { ethers } from "ethers";
import { initWalletByProvider } from './utils/initWallet';
import * as paymentContract from "../artifacts/contracts/PaymentContract.sol/PaymentContract.json";

async function main() {
    const signer = await initWalletByProvider(process.env.TESTNET_BINANCE_RPC_URL);
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
