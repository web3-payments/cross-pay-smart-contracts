import { ethers} from "hardhat";
import { providers } from "ethers";

const EXPOSED_KEY = "NOT_USED";

async function initWallet(key : string | undefined) {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(key ?? EXPOSED_KEY);

  console.log(`Using address ${wallet.address}`);
  const provider = setupProvider();
  const signer = wallet.connect(provider);
  console.log(`Connected to the node at ${provider.connection.url}`);
  await checkNetwork(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  //Throw error if connected wallet has under 0.01 ETH
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  return signer;
}

async function checkNetwork(provider: any) {
  const network = await provider.getNetwork();
  console.log(`Network name: ${network.name}\nChain Id: ${network.chainId}`);
  const lastBlock = await provider.getBlock("latest");
  console.log(`Connected at height: ${lastBlock.number}`);
}

function setupProvider() {
  const rpcUrl = process.env.CUSTOM_RPC_URL;
  const provider = new providers.JsonRpcProvider(rpcUrl);
  return provider;
}

export async function initWallet1() {
  return initWallet(process.env.PRIVATE_KEY);
}

export async function initWallet2() {
  return initWallet(process.env.PRIVATE_KEY_2);
}

export async function initWallet3() {
  return initWallet(process.env.PRIVATE_KEY_3);
}
