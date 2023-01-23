import { expect } from "chai";
import { ethers } from "hardhat";
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
const ONE_GWEI = 1_000_000_000;

describe("Armorer", function () {

    async function deployArmorer() {
        const Armorer = await ethers.getContractFactory("Armorer");
        const armorer = await Armorer.deploy();
        return armorer
    }
    describe("deployment", function () {
        it("should deploy the contract", async function () {
            const armorer = await loadFixture(deployArmorer)
            expect(await armorer.getA()).to.equal(1);
        });
    })

    describe("contract interaction", function () {
        it("should be able to withdraw from v1 DF", async function () {
            const armorer = await loadFixture(deployArmorer)

            // deploy df1
            const DarkForest1 = await ethers.getContractFactory("DarkForestV1");
            const df1 = await DarkForest1.deploy({ value: ONE_GWEI })
            const df1Balance = await ethers.getDefaultProvider().getBalance(df1.address);
            expect(df1Balance).to.equal(ONE_GWEI);

        });

    })



})