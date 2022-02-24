const { ethers } = require("hardhat");
require('dotenv').config();

const contractJson = require("../artifacts/contracts/CamCoin.sol/CamCoin.json");

const tokenAddress = "0xd6C8507Edf31EC5fEf799899d9D42Ac7835e5487";

async function main() {

  // shout out to Zev!
  const provider = new ethers.providers.JsonRpcProvider(hre.network.config.url);

  const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

  const contractInstance = new ethers.Contract(tokenAddress, contractJson.abi, wallet);

  let addresses = [
    "0x1BdBcaE2F2F719A53Eb7b7E201A1f0B9fcCD11Ce", // al
    "0x6499a5363871FD5DC8AceC436E0edCc69417E0B5", // Andrew
    "0xf9C4c10421db6bc73ba0BF27E5f8Ff2Ac5294b06", //kai
    "0x4dE6F4e4c2E9c48b2EF24b3374dFBE791F89852a", //alexisw
    "0x1DC6cC0F69f48c113BB91E13d705978A4D4c7C6B", //Alexander Mardar
    "0x70E566c8A8dF3cE7a5639D8E7cd044A06c365D7b", // Juan B
    "0x24876602373858cF6c6f9429e37b8fC04E5c1e20",//mathias
    "0xD4BD0D3971B998AD0f288932f8e357DCCB99D580",//enrico NEW ONE 
    "0x4Ac0184CBeFB6971534C2FD7871C3F0FF4F2974d", //David
    "0x3234B58D547a09b6e4A88Ad6E33e908fe7C0612f", // philip
    "0x6F234Fa20558743970ccEBD6AF259fCB49eeA73c", // Jordan
    "0x0C5Dee0a05F44aF1e3e669cE6a317F9336780A98", // alan
    "0x8A93cc16A3143d8Dd5BC9c2C2455D95f9f0414A0", // cara
    "0x1b5251158a60AEEbf7736bc070C47c897c41aEde", // dan m
    "0x49dEE713dA8c060a931DB12f281765E6C9136B51", // ellis
    "0x89D0f7C9b4919C286Da4C5ED4A503a70165E813B", // Alessandro
    "0x74304F75F0D9AD5D589Bb759BED2fF8113761372", //cagri
    "0x7c6372B5698Dc66142Fb54242b9C935Dd1F4d3cA", // Hao
    "0x8618EF154F18a42d605A0D3FfCCF6D1F383e4E84", // Michael H
     "0x1eb0bA41cCA2fE899aB238345E811d1F4be30ffb", // Jo
    "0xf0d9A38494b40b72dcd7A5CA109fd59d80b88337", //
    "0x97fe1A1f8DB02862c0E0e4f7BF7C190B02803b8E",//Ravi
    "0xEA4A402D8Aece1E0e2913758c7067976BEa110cf", //Aleksander
    "0x196d1084455052Af276b481A161aA86d884aaf73",// Adi (Adithya Vivek)
    "0x7422c488CA71dF4ad18F08600655d035211c4dBB", //Tiger
    "0x2ddb15C47440A147fD10C2a7cBec6677FdDE8CaB", //Michael|Cambridge
    "0x96A83D6a7e0E88a741C64C5BE559E7293254115B", //Karadi
    "0x2767CD05FdC45389aDb55e016358003227CfeBA5", // shane
    "0x203A9F2E0b65048bEDE4182eAdc4cCA6BA69F3B4", // Rafael C.
    "0xc7D146aDF51091D6cc79250411c09b79D23aFC30", // Ender
    "0xD403F0a642046CC5527cfef7965F72135ecd7280", //fara
    "0x10B2E44F709Ff41d497D8c8B2263CE4ddB59FA7d", //Calvin
    "0xB0D10B8Cc93bD9E70982A9Add5dB5AeDfd5c61d2", //Cameron M
    "0x98123314a99b00BF0E7F1a1987b2Ee6ECa6b05Dd", // Deepak
    "0xC2300Ae62991Fe5D66c7f75531c32fD6cE5eBaA9", // Rajal P.
    "0x45c7bcd9091AD400aC3FEAf767874ea1cc832344", // Adisa
  ];

  for(let i = 0; i < addresses.length; i++) {
    let tx = await contractInstance.transfer(addresses[i], ethers.utils.parseEther("42"));

    let tx_receipt = tx.wait(); // make sure you wait for this tx to make it into a block
  }

  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });