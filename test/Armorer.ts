import { expect } from "chai";
import { ethers } from "hardhat";
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";

describe("Armorer", function () {

    describe("deployment", function () {
        it("should deploy the contract", async function () {
            const Armorer = await ethers.getContractFactory("Armorer");
            const armorer = await Armorer.deploy();
            const a  = await armorer.getA()

            expect(a).to.equal(1);
        });

    })
})