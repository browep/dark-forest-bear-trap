import { ethers } from "hardhat";
async function main() {

    const signers = await ethers.getSigners()
    console.log(`signers: ${signers.map(s => s.address).join(",")}`)

    const contractAddress = process.env.CONTRACT_ADDRESS as string
    console.log(`contract address: ${contractAddress}`)

    const contractName = "Scratch";
    const ContractObj = await ethers.getContractFactory(contractName);

    const scratchContract = new ethers.Contract(contractAddress, ContractObj.interface, signers[0])
    console.log('calling myFunc...')
    const funcReturn  = await scratchContract.myFunc()
    console.log(`myFunc return: ${funcReturn}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
