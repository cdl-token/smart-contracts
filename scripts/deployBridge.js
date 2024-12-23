const { ethers } = require("hardhat");

async function main() {

  console.log("start");
  
  ///// creating token /////////////

  [Owner] = await ethers.getSigners();

  const WrappedCryptoDataLive = await ethers.getContractFactory("WrappedCryptoDataLive")
  const wrappedCryptoDataLive = await WrappedCryptoDataLive.deploy("WrappedCryptoDataLive","CDL",Owner.address);
  await wrappedCryptoDataLive.deployed();
  console.log("wrappedCryptoDataLive contract address", wrappedCryptoDataLive.address);

  const WrappedBridgeCDL = await ethers.getContractFactory("CryptoDataLiveBridge")
  const wrappedBridgeCDL = await WrappedBridgeCDL.deploy("0xdAC17F958D2ee523a2206206994597C13D831ec7", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", wrappedCryptoDataLive.address,"0xB3140bfd68B7b95DC61a2C71f5462aC98D86EF27");
  await wrappedBridgeCDL.deployed();
  console.log("wrappedBridgeCDL contract address", wrappedBridgeCDL.address);

  saveFrontendFiles(wrappedCryptoDataLive.address, "WrappedCryptoDataLive");
  saveFrontendFiles(wrappedBridgeCDL.address , "CryptoDataLiveBridge");

  // verifyContract("0x29C7c64FA7c596a76F5fCcb683BC2Af43929C22e",["WrappedCryptoDataLive","CDL",Owner.address])
  // verifyContract(wrappedBridgeCDL.address,["0xdAC17F958D2ee523a2206206994597C13D831ec7", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","0x29C7c64FA7c596a76F5fCcb683BC2Af43929C22e","0xB3140bfd68B7b95DC61a2C71f5462aC98D86EF27"])
}

async function verifyContract(contractAddress, constructorArguments) {
  try {
    console.log(`Verifying contract at ${contractAddress}...`);
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArguments,
    });
  } catch (error) {
    console.error(`Verification failed for ${contractAddress}:`, error);
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
