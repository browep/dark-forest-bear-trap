import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config()

const { HH_API_URL, HH_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: HH_API_URL,
      accounts: [HH_PRIVATE_KEY as string],
    }
  }
};

export default config;
