import { ethers } from "hardhat";
import {DarkForestV1Interface} from "../typechain-types/DarkForestV1";

async function main() {

  const contractAmount = ethers.utils.parseEther("0.0001");
  const signers = await ethers.getSigners()
  console.log(`signers: ${signers.map(s => s.address).join(",")}`)

  const contractName = "DarkForestV3";
  const DarkForestV1 = await ethers.getContractFactory(contractName);

  console.log(`Deploying ${contractName}`)
  const darkForestV1 = await DarkForestV1.deploy({ value: contractAmount });

  const txReceipt = await darkForestV1.deployed();

  console.log(`Contract created with ${ethers.utils.formatEther(contractAmount)} ETH deployed to ${darkForestV1.address}, via ${txReceipt.deployTransaction.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
