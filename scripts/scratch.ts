import { ethers } from "hardhat";
import {extraConfig, log} from "./helpers";

async function main() {

    const signers = await ethers.getSigners()
    log(`signers: ${signers.map(s => s.address).join(",")}`)

    const wsUrl = extraConfig().wsUrl

    log(`ws: ${wsUrl}`)
    const wsProvider = new ethers.providers.WebSocketProvider(wsUrl);

    log('listening...')

    let lastBlockTime = 0;

    wsProvider.on("block", (args) => {

        let newBlockNum = args;
        log(`block: ${newBlockNum}`);
        (async () => {
            const block = await wsProvider.getBlock(newBlockNum)
            log(`block time: ${block.timestamp}, deltaT: ${block.timestamp - lastBlockTime} difficulty: ${block.difficulty}, miner: ${block.miner}`)
            lastBlockTime = block.timestamp
        })()

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
