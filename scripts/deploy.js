const { ethers } = require("hardhat");

async function main() {

  console.log("start");
  
  ///// creating token /////////////

  [Owner] = await ethers.getSigners();

  const cryptoDataLive = await ethers.getContractFactory("CryptoDataLive")
  const CryptoDataLive = await cryptoDataLive.deploy();
  await CryptoDataLive.deployed();
  console.log("CryptoDataLive contract address", CryptoDataLive.address);

  const crypto_Data_Live_Presale = await ethers.getContractFactory("Crypto_Data_Live_Presale")
  const Crypto_Data_Live_Presale = await crypto_Data_Live_Presale.deploy("0x55d398326f99059ff775485246999027b3197955", "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", CryptoDataLive.address);
  await Crypto_Data_Live_Presale.deployed();
  console.log("Crypto_Data_Live_Presale contract address", Crypto_Data_Live_Presale.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
