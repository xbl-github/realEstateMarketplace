pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

//import "./verifier_pghr13.sol";
import "./verifier-zok030-3-9-edited.sol";
import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is REMarketPlaceERC721Token
{

    Verifier squareVerifier;
    
    constructor(address verifierAddress) public
    {
        squareVerifier = Verifier(verifierAddress);
    }
    
    // TODO define a solutions struct that can hold an index & an address
    struct solutions 
    {
        bytes32 index;
        address solutionsAddress;
    }

    // TODO define an array of the above struct
    solutions[] solutionsArray;

    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => bool) private submittedSolution;


    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 index, address solutionAddress);


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 key,address to) public returns(bool)
    {
           submittedSolution[key] = true;
           solutionsArray.push(solutions({index:key, solutionsAddress: to}));
           emit SolutionAdded(key, to);
           return true;
    
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mint_verified
                          (     
                                address to,
                                uint256 tokenId,
                                uint[2] memory a,
                                uint[2] memory a_p,
                                uint[2][2] memory b,
                                uint[2] memory b_p,
                                uint[2] memory c,
                                uint[2] memory c_p,
                                uint[2] memory h,
                                uint[2] memory k,
                                uint[2] memory input

                            ) public returns(bool)
     {
        
        
        bytes32 solutionKey = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        
        // submittedSolution[solutionKey] has default value of false if key has not been seen before
        require(submittedSolution[solutionKey] == false, "Solution is not unique, cannot mint tokens.");
       
        bool status = squareVerifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input);
        require(status, "Verifiation failed, cannot mint tokens.");
        
        addSolution(solutionKey, to);
        return super.mint(to, tokenId);
        
     }

}




















