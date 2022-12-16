import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config()

const { HH_API_URL_SEPOLIA, HH_PRIVATE_KEY, HH_API_URL_MAINNET } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: HH_API_URL_SEPOLIA,
      accounts: [HH_PRIVATE_KEY as string],
    },
    mainnet: {
      url: HH_API_URL_MAINNET,
      accounts: [HH_PRIVATE_KEY as string],
    }
  }
};

export default config;
