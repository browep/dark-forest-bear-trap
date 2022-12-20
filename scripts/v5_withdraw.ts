import {ethers} from "hardhat";
import {extraConfig, log} from "./helpers";

async function main() {

    const contractName = "DarkForestV5";

    const signers = await ethers.getSigners()
    log(`signers: ${signers.map(s => s.address).join(",")}`)
    const contractAddress = process.env.CONTRACT_ADDRESS as string
    log(`contract address: ${contractAddress}`)
    let signer = signers[0];
    log(`signer: ${signer.address}`)

    const wsUrl = extraConfig().wsUrl
    log(`ws: ${wsUrl}`)
    const wsProvider = new ethers.providers.WebSocketProvider(wsUrl);

    const currentBlockNumber = await wsProvider.getBlockNumber()
    log(`current block number: ${currentBlockNumber}`)
    const lastValidBlock = currentBlockNumber + 4
    log(`waiting for block: ${lastValidBlock}`)

    const DarkForest = await ethers.getContractFactory(contractName);

    const contractInstance = new ethers.Contract(contractAddress, DarkForest.interface, signer)
    log(`resetting trap...`)
    const resetTrapTx = await contractInstance.resetTrap(lastValidBlock)
    log(`txHash: ${resetTrapTx.hash}, waiting for conf...`);
    await resetTrapTx.wait()
    log('finished.')

    log('listening for blocks...')
    wsProvider.on("block", (args) => {
        let newBlockNum = args;
        log(`block: ${newBlockNum}`)
        if (newBlockNum == lastValidBlock - 1) {
            (async () => {
                log(`baiting trap, doing withdraw call`)
                const ether = "0.004";
                log(`withdrawing with value: ${ether} ETH`)
                const withRes = await contractInstance.withdraw({value: ethers.utils.parseEther(ether), gasLimit: 100000})
                log(`txHash: ${withRes.hash}, waiting for conf...`);
                await withRes.wait()
                log('finished.')
            })()
        }
    })

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 50000));
    }

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
