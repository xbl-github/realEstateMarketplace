// migrating the appropriate contracts
var ERC721Mintable      = artifacts.require("REMarketPlaceERC721Token");
var SquareVerifier      = artifacts.require("Verifier");
var SolnSquareVerifier  = artifacts.require("SolnSquareVerifier");

module.exports = function (deployer) {
  deployer.deploy(ERC721Mintable);
  deployer.deploy(SquareVerifier)
  .then( () => 
  {
        return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
  });
};
