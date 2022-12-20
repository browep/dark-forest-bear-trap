import { ethers } from "hardhat";
import {extraConfig, log} from "./helpers";

async function main() {

    const signers = await ethers.getSigners()
    log(`signers: ${signers.map(s => s.address).join(",")}`)

    const wsUrl = extraConfig().wsUrl

    log(`ws: ${wsUrl}`)
    const wsProvider = new ethers.providers.WebSocketProvider(wsUrl);

    log('listening...')
    wsProvider.on("block", (args) => {
        log(`block: ${JSON.stringify(args)}`)
    })

    while(true) {
        await new Promise(resolve => setTimeout(resolve, 50000));
    }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
