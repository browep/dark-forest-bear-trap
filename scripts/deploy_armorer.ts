import { ethers } from "hardhat";

async function main() {

    const contractAmount = 0;
    const signers = await ethers.getSigners()
    console.log(`signers: ${signers.map(s => s.address).join(",")}`)

    const contractName = "Armorer";
    const Armorer = await ethers.getContractFactory(contractName);

    console.log(`Deploying ${contractName}`)
    const armorer = await Armorer.deploy();

    const txReceipt = await armorer.deployed();

    console.log(`Contract created with ${ethers.utils.formatEther(contractAmount)} ETH deployed to ${armorer.address}, via ${txReceipt.deployTransaction.hash}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
