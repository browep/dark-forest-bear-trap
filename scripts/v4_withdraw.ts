import { ethers } from "hardhat";
async function main() {

  const signers = await ethers.getSigners()
  console.log(`signers: ${signers.map(s => s.address).join(",")}`)
  const contractAddress = process.env.CONTRACT_ADDRESS as string
  console.log(`contract address: ${contractAddress}`)
  let signer = signers[0];
  console.log(`signer: ${signer.address}`)

  const contractName = "DarkForestV4";
  const DarkForestV1 = await ethers.getContractFactory(contractName);

  const contractInstance = new ethers.Contract(contractAddress, DarkForestV1.interface, signer)
  const ether = "0.004";
  console.log(`withdrawing with value: ${ether} ETH`)
  const withRes = await contractInstance.withdraw({value: ethers.utils.parseEther(ether)})
  console.log(`txHash: ${withRes.hash}, waiting for conf...`);
  await withRes.wait()
  console.log('finished.')

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
