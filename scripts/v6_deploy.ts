import { ethers } from "hardhat";
import {DarkForestV1Interface} from "../typechain-types/DarkForestV1";

const log = (msg: string) => console.log(`${new Date().toISOString()}: ${msg}`)

async function main() {

  const contractName = "DarkForestV6";

  const contractAmount = ethers.utils.parseEther("0.016");
  const signers = await ethers.getSigners()
  log(`signers: ${signers.map(s => s.address).join(",")}`)

  const darkForest = await ethers.getContractFactory(contractName);

  log(`Deploying ${contractName}`)
  const darkForestV1 = await darkForest.deploy({ value: contractAmount });

  const txReceipt = await darkForestV1.deployed();

  log(`Contract created with ${ethers.utils.formatEther(contractAmount)} ETH deployed to ${darkForestV1.address}, via ${txReceipt.deployTransaction.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
