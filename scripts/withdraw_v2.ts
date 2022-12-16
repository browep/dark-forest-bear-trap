import { ethers } from "hardhat";
async function main() {

  const signers = await ethers.getSigners()
  console.log(`signers: ${signers.map(s => s.address).join(",")}`)
  const contractAddress = process.env.CONTRACT_ADDRESS as string
  console.log(`contract address: ${contractAddress}`)

  const contractName = "DarkForestV2";
  const DarkForestV1 = await ethers.getContractFactory(contractName);

  const c2 = new ethers.Contract(contractAddress, DarkForestV1.interface, signers[0])
  console.log(`withdrawing with value`)
  const withRes = await c2.withdraw({value: 1})
  console.log(`txHash: ${withRes.hash}, waiting for conf...`);
  await withRes.wait()
  console.log('finished')

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
