import  {expect}  from  "chai";
import { solidity } from "ethereum-waffle";

chai.use(solidity);
// import  {ethers}  from "ethers"
// import  {isCallTrace} from  "hardhat/internal/hardhat-network/stack-trace/message-trace";

// describe("Token contract",function(){

//     it("Deployment should assign the total supply of token to the owner", async function(){
//         const [owner] = await ethers.getSigners();

//         console.log("Signers object:",owner);
//         const token = await ethers.getContractFactory("Token");

//         const hardhatToken = await token.deploy();


//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         console.log("owner is:-",owner.address);

//         expect(await hardhatToken.totalSupply()).to.deep.equal(ownerBalance);
//     })
//     it("Should transfer tokens between accounts", async function(){
//         const [owner, add1,add2]= await ethers.getSigners();
//         const Token = await ethers.getContractFactory("Token");
//         const hardhatToken = await Token.deploy();
//         await hardhatToken.transfer(add1.address,10);
//         expect((await hardhatToken.balanceOf(add1.address)).toNumber()).to.equal(10);
//         await  hardhatToken.connect(add1).transfer(add2.address,5)
//         expect((await hardhatToken.balanceOf(add2.address)).toNumber()).to.equal(5);
//     })
// })


describe("Token Contract",function(){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner, addr1,addr2,...addrs] = await ethers.getSigners();
        hardhatToken= await Token.deploy();
    })
    describe("Deployment",function(){
        it("Should set the owner",async function(){
            expect(await hardhatToken.owner()).to.deep.equal(owner.address)
        })
        it("should assign the total supply of token to the owner ",async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address)
            expect(await hardhatToken.totalSupply()).to.deep.equal(ownerBalance);
        })
    })
    describe("Transactions",function(){
        it("Should transfer tokens between accounts",async function(){
            await hardhatToken.transfer(addr1.address,5);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect((addr1Balance).toNumber()).to.equal(5);
            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect((addr2Balance).toNumber()).to.equal(5);
        });
        it("Should fail if sender does not have enought token",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect (hardhatToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("not enough token")
            expect((await hardhatToken.balanceOf(owner.address)).toNumber()).to.equal(initialOwnerBalance)
        });
    })
})