import { ethers } from "hardhat";
async function main() {

  const signers = await ethers.getSigners()
  console.log(`signers: ${signers.map(s => s.address).join(",")}`)
  const contractAddress = process.env.CONTRACT_ADDRESS as string
  console.log(`contract address: ${contractAddress}`)

  const contractName = "DarkForestV3";
  const DarkForestV1 = await ethers.getContractFactory(contractName);

  const contractInstance = new ethers.Contract(contractAddress, DarkForestV1.interface, signers[0])
  console.log(`resetting trap`)
  let resetTrapRes = await contractInstance.resetTrap()
  console.log(`txHash: ${resetTrapRes.hash}, waiting for conf...`);
  await resetTrapRes.wait()
  console.log('trap reset.')
  let ether = "0.0170";
  const sendTx  = await signers[0].sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther(ether)
  })
  console.log(`sending value of ${ether} ETH, via ${sendTx.hash}...`)
  await sendTx.wait()
  console.log('done.')

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
