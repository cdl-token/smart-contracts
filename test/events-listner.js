const { ethers } = require('ethers');
const BridgeEth = require('../contractsData/ETHBridgeBase.json');
const bridgeEthAddress = require('../contractsData/ETHBridgeBase-address.json');

const BridgePoly = require('../contractsData/WrapedBridgeBase.json');
const bridgePolyAddress = require('../contractsData/WrapedBridgeBase-address.json');



const sepoUrl = "https://ethereum-sepolia-rpc.publicnode.com";
const PolyUrl = 'https://rpc-amoy.polygon.technology';

const providerEth = new ethers.providers.JsonRpcProvider(sepoUrl);
const providerPoly = new ethers.providers.JsonRpcProvider(PolyUrl);

const adminPrivKey = 'ded60b85d41ce2b50039715d902e4defcd28715925dfe7251e482e6a63a7a3f3'; // Add your private key here
const walletETH = new ethers.Wallet(adminPrivKey, providerEth);
const walletPoly = new ethers.Wallet(adminPrivKey, providerPoly);


const bridgeEth = new ethers.Contract(bridgeEthAddress.address, BridgeEth.abi, walletETH);
const bridgePoly = new ethers.Contract(bridgePolyAddress.address, BridgePoly.abi, walletPoly);

bridgeEth.on('LockDeposits', async (from, to, amount, date, totalFreeze, bridge) => {
  const tx = await bridgePoly.mint(from, amount, totalFreeze);
  const receipt = await tx.wait();

  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from}
    - to ${to}
    - amount ${amount} tokens
    - date ${date}
  `);
});

bridgePoly.on('WrappedBurn', async (from, to, amount, date, nonce, step) => {
  const tx = await bridgeEth.unLockDeposit(to, amount);
  const receipt = await tx.wait();

  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from}
    - to ${to}
    - amount ${amount} tokens
    - date ${date}
  `);
});

