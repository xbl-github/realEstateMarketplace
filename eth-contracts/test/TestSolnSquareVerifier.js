let SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
let SquareVerifier     = artifacts.require("Verifier");

const squareProof = require('../../zokrates/code/square/proof-3-9/proof.json');
contract("Test SolnSquareVerifier", accounts =>{

    describe("Test SolnSquareVerifier", function() 
    {
        beforeEach(async function() {
            let squareVerifier     = await SquareVerifier.new();
            this.contract =  await SolnSquareVerifier.new(squareVerifier.address);
           
        })
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it("Can add new solution ", async function () {
            let key = web3.utils.asciiToHex("1");
            //let newaddress = accounts[0];
            let status = false;
            try
            {
                status = await  this.contract.addSolution.call(key, accounts[1], {from: accounts[0] });
            }catch(e)
            {
                console.log("error when adding new solution ", e);
            }
            assert.equal(status, true, "new solution cannot be added.");
        
        })
        
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it("Can mint token ", async function (){
            let tokenId = 1;
            
            let status = false
            try
            {      
                  status = await this.contract.mint_verified.call( 
                                                    accounts[1],
                                                     tokenId  ,
                                                    squareProof.proof.A, 
                                                    squareProof.proof.A_p,
                                                    squareProof.proof.B,
                                                    squareProof.proof.B_p, 
                                                    squareProof.proof.C, 
                                                    squareProof.proof.C_p,
                                                    squareProof.proof.H,
                                                    squareProof.proof.K,
                                                    squareProof.input,
                                                    {from: accounts[0]});
                  
                
             } catch(e)
             {
                console.log("error from mint_verified ", e);
             
             }
             assert.equal(status, true, "Cannot call mint verified.");
        })
       
    

    });
})
