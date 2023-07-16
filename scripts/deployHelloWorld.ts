import { ethers } from "ethers";
import helloworldArtifact from "../artifacts/contracts/Helloworld.sol/HelloWorld.json";

// Ethereumネットワーク上にスマートコントラクト（HelloWorld）をデプロイする
async function main() {
  const privateKey: string = process.env.PRIVATE_KEY ?? "";
  if (privateKey === "") {
    throw new Error("No Value Set for environment variable PRIVATE_KEY");
  }

  // Ethereumネットワークへの接続点
  const rpcUrl: string = process.env.SEPOLIA_URL ?? "";
  if (rpcUrl === "") {
    throw new Error("No Value Set for environment variable SEPOLIA_URL");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(
    helloworldArtifact.abi, // スマートコントラクトのABI（Application Binary Interface）
    helloworldArtifact.bytecode, // コンパイル済みのスマートコントラクト
    signer
  );

  // スマートコントラクトをテスト用ネットワークにデプロイ
  const contract = await factory.deploy(); // トランザクションが送られるのを待つ
  console.log(`HelloWorld contract deploy address ${contract.address}`); // スマートコントラクトのアドレス
  console.log(
    `Transaction URL: https://sepolia.etherscan.io/tx/${contract.deployTransaction.hash}`
  );

  await contract.deployed(); // トランザクションが実行される(ブロックに取り込まれる)のを待つ
  console.log("Deploy completed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
