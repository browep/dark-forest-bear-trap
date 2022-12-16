import { ethers } from "hardhat";
import {DarkForestV1Interface} from "../typechain-types/DarkForestV1";
async function main() {

  const signers = await ethers.getSigners()
  console.log(`signers: ${signers.map(s => s.address).join(",")}`)
  const contractAddress = process.env.CONTRACT_ADDRESS as string
  console.log(`contract address: ${contractAddress}`)

  const contractName = "DarkForestV1";
  const DarkForestV1 = await ethers.getContractFactory(contractName);


  // const contract = DarkForestV1.attach(darkForestV1.address)
  // const dfv1 = contract.interface as DarkForestV1Interface
  const c2 = new ethers.Contract(contractAddress, DarkForestV1.interface, signers[0])
  // const withdrawFunc = c2.functions["withdraw"]
  console.log(`withdrawing`)
  const withRes = await c2.withdraw()
  console.log(withRes.constructor['name']);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
