const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Diploma", function() {
    let Diploma, diploma, owner, addr1, addr2

    beforeEach(async ()=>{
        Diploma = await ethers.getContractFactory('diploma')
        diploma = await Diploma.deploy();
        await diploma.deployed();
    
        [owner, addr1, addr2, _] = await ethers.getSigners()
    })

    describe("Deployement", function(){
        it("owner shoult be initialized", async function(){
          const ownerTx = await diploma.getOwner()
          expect(ownerTx).to.equal(owner.address)
        })

        it("title should be set", async function(){
            const titleTx = await diploma.name()
            expect(titleTx).to.equal("diplokma")
        })
    })

    describe("Owner only function", function(){
        it("should be false", async function(){
            const allowedTx = await diploma.getAllowedCreatorByAddress(addr1.address)
            expect(allowedTx).to.equal(false);

            const allowedTxBis = await diploma.getAllowedCreatorByAddress(addr2.address)
            expect(allowedTxBis).to.equal(false);
        })

        it("should add a creator", async function(){
            const addCreatorTx = await diploma.addCreator(addr1.address)
            const allowedTx = await diploma.getAllowedCreatorByAddress(addr1.address)

            expect(allowedTx).to.equal(true);
        })

        it("should delete a creator", async function(){
            const addCreatorTx = await diploma.deleteCreator(addr1.address)
            const allowedTx = await diploma.getAllowedCreatorByAddress(addr1.address)

            expect(allowedTx).to.equal(false);
        })

        it("should not be able to run addCreator function", async function(){
            await expect(
                diploma.connect(addr1).addCreator(addr2.address)
            ).to.be.revertedWith("you cant use this function, only owner of the contract can.")
       
            await expect(
                diploma.connect(addr2).addCreator(addr1.address)
            ).to.be.revertedWith("you cant use this function, only owner of the contract can.")
        })

        it("should not be able to run deleteCreator function", async function(){
            await expect(
                diploma.connect(addr1).deleteCreator(addr2.address)
            ).to.be.revertedWith("you cant use this function, only owner of the contract can.")
       
            await expect(
                diploma.connect(addr2).deleteCreator(addr1.address)
            ).to.be.revertedWith("you cant use this function, only owner of the contract can.")
        })
    })

    describe("Creator only functions", function(){
        it("should not be able to use creator only functions", async function(){
            await expect(
                diploma.createDegree(
                    "Diploma very first degree",
                    addr2.address,
                    "Bae",
                    "Kang",
                    "27/05/2022",
                    "Jakarta",
                    "Trés Bien"
                )
            ).to.be.revertedWith("you cant use this function, only certifie creator can.")
        })

        it("should be able to add a degreee", async function(){
            await diploma.addCreator(addr1.address)
            
            const addDegreeTx = diploma.connect(addr1).createDegree(
                "Diploma very first degree",
                addr2.address,
                "Bae",
                "Kang",
                "27/05/2022",
                "Jakarta",
                "Trés Bien"
            )

            // check if tx sucsessfull
            // retrieve created degree
            // check if all the info are correct
        })
    })

    describe("Degree", function(){
        it("degree should be added to degree list", async function(){
            await diploma.addCreator(addr1.address)
            
            const addDegreeTx = diploma.connect(addr1).createDegree(
                "Diploma very first degree",
                addr2.address,
                "Bae",
                "Kang",
                "27/05/2022",
                "Jakarta",
                "Trés Bien"
            )

            // check if tx sucsessfull
            // check if degree is added in list
        })

        it("should retrieve all degrees from an address", async function(){

        })

        it("should get all the degrees", async function(){
            
        })
    })
})  