const hre = require("hardhat");
export const log = (msg: string) => console.log(`${new Date().toISOString()}: ${msg}`)

log(`network name: ${hre.network.name}`);

export type ExtraConfig = {
    wsUrl: string
}

export const extraConfig = (): ExtraConfig => {

    const configs: { [id: string]: ExtraConfig; } = {
        "sepolia": {
            wsUrl: process.env.HH_API_URL_SEPOLIA_WS as string
        },
        "mainnet": {
            wsUrl: process.env.HH_API_URL_MAINNET_WS as string
        }
    };

    return configs[hre.network.name]
}



