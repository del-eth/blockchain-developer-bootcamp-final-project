const ProofOfTrees = artifacts.require("./ProofOfTrees.sol");

module.exports = function (deployer) {
  deployer.deploy(ProofOfTrees);
};
