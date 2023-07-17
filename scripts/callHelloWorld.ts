import { ethers } from "ethers";
import helloworldArtifact from "../artifacts/contracts/Helloworld.sol/HelloWorld.json";

// Ethereumネットワーク上にスマートコントラクト（HelloWorld）をデプロイする
async function main(address: string) {
  // Ethereumネットワークへの接続点
  const rpcUrl: string = process.env.SEPOLIA_URL ?? "";
  if (rpcUrl === "") {
    throw new Error("No Value Set for environment variable SEPOLIA_URL");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(
    address,
    helloworldArtifact.abi,
    provider
  );

  // スマートコントラクトの呼び出し
  const message = await contract.getMessage();
  console.log(`HelloWorld contract message: ${message}`);
}

const address = "0xE01E24eA9c6d4448632fb7A412e442E208efB9b3";
main(address).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
