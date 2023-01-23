import {ethers} from "hardhat";
import {extraConfig, log} from "./helpers";

async function main() {

    const contractName = "DarkForestV6";

    const signers = await ethers.getSigners()
    log(`signers: ${signers.map(s => s.address).join(",")}`)
    const contractAddress = process.env.CONTRACT_ADDRESS as string
    log(`contract address: ${contractAddress}`)
    let signer = signers[1];
    log(`signer: ${signer.address}`)

    const wsUrl = extraConfig().wsUrl
    log(`ws: ${wsUrl}`)
    const wsProvider = new ethers.providers.WebSocketProvider(wsUrl);

    const DarkForest = await ethers.getContractFactory(contractName);

    const contractInstance = new ethers.Contract(contractAddress, DarkForest.interface, signer)

    log('listening for blocks...')
    wsProvider.on("block", (args) => {
        let newBlockNum = args;
        log(`block: ${newBlockNum}`);
        (async () => {
            const block = await wsProvider.getBlock(newBlockNum)
            log(`block time: ${block.timestamp}, miner: ${block.miner}`)

            const isValidRes = await contractInstance.isValid()

            log(`isValidRes: ${isValidRes}`)
            if (isValidRes) {
                log(`valid`)
                log('turning off listener')
                wsProvider.off("block")
                const ether = "0.004";
                log(`withdrawing with value: ${ether} ETH`)
                const withRes = await contractInstance.withdraw({value: ethers.utils.parseEther(ether), gasLimit: 100000})
                log(`txHash: ${withRes.hash}, waiting for conf...`);
                await withRes.wait()
                log('finished.')
                process.exit(0)

            } else {
                log(`not valid`)
            }

        })()
    })

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 50000));
    }

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
