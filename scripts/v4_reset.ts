import { ethers } from "hardhat";
async function main() {

  const signers = await ethers.getSigners()
  console.log(`signers: ${signers.map(s => s.address).join(",")}`)
  const contractAddress = process.env.CONTRACT_ADDRESS as string
  console.log(`contract address: ${contractAddress}`)

  const contractName = "DarkForestV4";
  const DarkForestV1 = await ethers.getContractFactory(contractName);

  const contractInstance = new ethers.Contract(contractAddress, DarkForestV1.interface, signers[0])
  console.log(`resetting trap`)
  let resetTrapRes = await contractInstance.resetTrap()
  console.log(`txHash: ${resetTrapRes.hash}, waiting for conf...`);
  await resetTrapRes.wait()
  console.log('trap reset.')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
