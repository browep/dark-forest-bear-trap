import { expect } from "chai";
import { ethers, network } from "hardhat";
import {loadFixture, setBalance} from "@nomicfoundation/hardhat-network-helpers";
const ONE_GWEI = 1_000_000_000;
const HUN_GWEI = 1_000_000_000 * 1000;

describe("Armorer", function () {

    async function deployArmorer() {
        const Armorer = await ethers.getContractFactory("Armorer");
        return await Armorer.deploy();
    }

    async function deployArmorerAndDF1() {
        const Armorer = await ethers.getContractFactory("Armorer");
        const armorer = await Armorer.deploy();

        const DarkForest1 = await ethers.getContractFactory("DarkForestV1");
        const df1 = await DarkForest1.deploy({value: HUN_GWEI})
        let df1Balance = await ethers.provider.getBalance(df1.address);
        expect(df1Balance).to.equal(ethers.BigNumber.from(HUN_GWEI));

        return {armorer, df1}
    }

    describe("deployment", function () {
        it("should deploy the armorer contract", async function () {
            const armorer = await loadFixture(deployArmorer)
        });
    })

    describe("contract interaction", function () {

        it("should be able to withdraw straight from v1 DF", async function () {
            // deploy df1
            const {armorer, df1} = await loadFixture(deployArmorerAndDF1);
            let df1Balance = await ethers.provider.getBalance(df1.address);
            expect(df1Balance).to.equal(ethers.BigNumber.from(HUN_GWEI));

            // withdraw straight
            await df1.withdraw()

            // check balance
            df1Balance = await ethers.provider.getBalance(df1.address);
            expect(df1Balance).to.equal(ethers.BigNumber.from(0));

        })

        it("should be able to withdraw from v1 DF", async function () {
            const {armorer, df1} = await loadFixture(deployArmorerAndDF1);

            let df1Balance = await ethers.provider.getBalance(df1.address);
            expect(df1Balance).to.equal(ethers.BigNumber.from(HUN_GWEI));

            const [signer] = await ethers.getSigners()
            const signerStartingBalance = await ethers.provider.getBalance(signer.address);

            // try to get funds from df1
            let ABI = [
                "function withdraw()"
            ];
            let iface = new ethers.utils.Interface(ABI);
            const funcData = iface.encodeFunctionData("withdraw" )
            await armorer.yoink(df1.address, funcData)

            // df1 should have no funds now
            df1Balance = await ethers.provider.getBalance(df1.address);
            expect(df1Balance).to.equal(ethers.BigNumber.from(0));

            // signer should have more funds now
            const signerEndingBalance = await ethers.provider.getBalance(signer.address);
            expect(signerEndingBalance).to.be.greaterThan(signerStartingBalance, `\nstart: ${signerStartingBalance}\nend  : ${signerEndingBalance}`);

        });

    })

})