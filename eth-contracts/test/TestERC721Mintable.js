var ERC721MintableComplete = artifacts.require('REMarketPlaceERC721Token');//('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    
    console.log("Accounts for testing ERC721MintableComplete");
    console.log(accounts);
    console.log("account_two   has 2 tokens");
    console.log("account_three has 3 tokens");
    console.log("account_four  has 4 tokens");
    

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two,1,{from: account_one});
            await this.contract.mint(account_two,2,{from: account_one});
            
            await this.contract.mint(account_three,3,{from: account_one});
            await this.contract.mint(account_three,4,{from: account_one});
            await this.contract.mint(account_three,5,{from: account_one});
            
            await this.contract.mint(account_four,6,{from: account_one});
            await this.contract.mint(account_four,7,{from: account_one});
            await this.contract.mint(account_four,8,{from: account_one});
            await this.contract.mint(account_four,9,{from: account_one});
            
            
            
        })

        it('should return total supply', async function () { 
        
            let total = await this.contract.totalSupply.call();
            console.log("total supply returned is ", total.toNumber());
            assert.equal(total.toNumber(), 9, "Total supply should be 9 but a different number returned");
            
        })

        it('should get token balance for account_two', async function () { 
        
            let balance = await this.contract.balanceOf.call(account_two, {from: account_one});
            console.log("balance returned is ", balance.toNumber());
            assert.equal(balance.toNumber(), 2, "Balance of account_two should be 2.");
            
        })
        it('should get token balance for account_three', async function () { 
        
            let balance = await this.contract.balanceOf.call(account_three, {from: account_one});
            console.log("balance returned is ", balance.toNumber());
            assert.equal(balance.toNumber(), 3, "Balance of account_two should be 3.");
            
        })
        it('should get token balance for account_four', async function () { 
        
            let balance = await this.contract.balanceOf.call(account_four, {from: account_one});
            console.log("balance returned is ", balance.toNumber());
            assert.equal(balance.toNumber(), 4, "Balance of account_two should be 4.");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI.call(2, {from: account_three});
            console.log("tokenURI returned is: ", tokenURI);
            assert(tokenURI == "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2", "TokenURI does not match");
            
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 2;
            await this.contract.approve(account_four, tokenId, {from: account_two});
            console.log("account_four approved by account_two, and can now can transferFrom.");
            await this.contract.transferFrom(account_two, account_four, tokenId, {from: account_four});
            
            let newOwner = await this.contract.ownerOf.call(tokenId);
            
            assert.equal(newOwner, account_four, "New owner should be account_four.");
       
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner.', async function () { 
            let fail = false;
            try
            {
                 await this.contract.mint(account_four,9,{from: account_four});
            }catch(e)
            {
                fail = true;
            }
            //console.log("fail ", fail);
            assert.equal(fail, true, "Only account_one can mint new tokens.");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner.call({from: account_one});
            assert.equal(owner, account_one, "Owner should be acount_one.");
        })

    });
})
