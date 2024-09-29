const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const EnergyEscrow = artifacts.require("EnergyEscrow");

module.exports = async function(deployer) {
  const verifier = "0xF0EF317533B46728501d90761BA820B1899a8b28"
  const gasEstimate = await contract.methods.createTrade(sellerAddress).estimateGas({ from: currentAccount, value: web3.utils.toWei(tradeAmount, 'ether') });
  console.log("Estimated gas for createTrade:", gasEstimate);
  deployer.deploy(EnergyEscrow, verifier, { gas: 6721975 })
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
