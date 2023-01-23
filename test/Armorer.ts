import { expect } from "chai";
import { ethers, network } from "hardhat";
import {loadFixture, setBalance} from "@nomicfoundation/hardhat-network-helpers";
const ONE_GWEI = 1_000_000_000;

describe("Armorer", function () {

    async function deployArmorer() {
        const Armorer = await ethers.getContractFactory("Armorer");
        return await Armorer.deploy();
    }
    describe("deployment", function () {
        it("should deploy the contract", async function () {
            const armorer = await loadFixture(deployArmorer)
            expect(await armorer.getA()).to.equal(1);
            const [owner] = await ethers.getSigners();
            expect(await armorer.owner()).to.equal(owner.address);
            console.log(`network name: ${network.name}`);
            console.log(`owner: ${owner.address}`)
            console.log(`get Balance: ${await ethers.provider.getBalance(owner.address)}`)
            console.log(`default network: ${ethers.getDefaultProvider().network.name}`)

        });
    })

    describe("contract interaction", function () {
        it("should be able to withdraw from v1 DF", async function () {
            const armorer = await loadFixture(deployArmorer)

            // deploy df1
            const DarkForest1 = await ethers.getContractFactory("DarkForestV1");
            const df1 = await DarkForest1.deploy({value: ONE_GWEI})
            const df1Balance = await ethers.provider.getBalance(df1.address);
            expect(df1Balance).to.equal(ethers.BigNumber.from(ONE_GWEI));

        });

    })



})