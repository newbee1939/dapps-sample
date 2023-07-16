import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld Contract", () => {
  it("getMessage retuns HelloWorld", async () => {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloworld = await HelloWorld.deploy();
    await helloworld.deployed();

    expect(await helloworld.getMessage()).to.equal("Hello World");
  });
});
// テストの中で擬似的にイーサリアムのネットワークを作る
// それに実際にデプロイして、結果も見れる
