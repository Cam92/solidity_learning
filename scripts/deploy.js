require('dotenv').config();

async function main() {
  // replace argument with the name of the contract you want to deploy!
  const Game = await hre.ethers.getContractFactory("Game4");
  // if you need to add constructor arguments for the game, add them here:
  const game = await Game.deploy(123);
  console.log(`Game deployed to address: `, game.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });