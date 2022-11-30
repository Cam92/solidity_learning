const { ethers } = require("ethers");

const GAME_ADDRESS = "0x4D95186c314f362eF74550ce970a1aAd949e1075";
const URL = process.env.RINKEBY_URL;
const provider = new ethers.providers.JsonRpcProvider(URL);

async function main() {
  const game = await hre.ethers.getContractAt("Game4", GAME_ADDRESS);

  const secret = await provider.getStorageAt(GAME_ADDRESS, "0xd367c13b6472f77e7a5dda1c6168dc4ec604d3a1b3b5f06a8197270887866b4c");

  console.log(secret);

  const tx = await game.win(secret);
  const receipt = await tx.wait();

  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
