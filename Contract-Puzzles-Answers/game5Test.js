const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    
    let signer1 = ethers.provider.getSigner(0);
    let winning = false;

    while(!winning) {
      let wallet = new ethers.Wallet.createRandom();
      console.log(wallet.address);

      if (wallet.address < 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf) {
        console.log("Winning address found");
        await signer1.sendTransaction({to: wallet.address, value: ethers.utils.parseEther("1")})
        await game.connect(wallet.connect(ethers.provider)).win();
        console.log("boom");
        winning = true;
      }
    }

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
