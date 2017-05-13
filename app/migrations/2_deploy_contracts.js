// BEGIN 🦄 Transmute Framework 
var ConvertLib = artifacts.require("./TransmuteFramework/ConvertLib.sol");
var MetaCoin = artifacts.require("./TransmuteFramework/MetaCoin.sol");

const transmuteDeployer = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
// END 🐩 Transmute Framework 

var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
	// Patched by Transmute Framework
	transmuteDeployer(deployer)

  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
