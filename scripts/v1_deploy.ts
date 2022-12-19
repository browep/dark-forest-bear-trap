import { ethers } from "hardhat";

async function main() {

  const contractAmount = ethers.utils.parseEther("0.001");
  const signers = await ethers.getSigners()
  console.log(`signers: ${signers.map(s => s.address).join(",")}`)

  const contractName = "DarkForestV1";
  const DarkForestV1 = await ethers.getContractFactory(contractName);

  console.log(`Deploying ${contractName}`)
  const darkForestV1 = await DarkForestV1.deploy({ value: contractAmount });

  const txReceipt = await darkForestV1.deployed();

  console.log(`Contract created with ${ethers.utils.formatEther(contractAmount)} ETH deployed to ${darkForestV1.address}, via ${txReceipt.deployTransaction.hash}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
