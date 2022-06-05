const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Diploma", function() {
    var should = require('chai').should();
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
            const addCreatorTx = await diploma.addCreator(addr1.address, "LILLE 1 FST", "FRANCE")
            const allowedTx = await diploma.getAllowedCreatorByAddress(addr1.address)

            expect(allowedTx).to.equal(true);
        })

        it("should delete a creator", async function(){
            const addCreatorTx = await diploma.deleteCreator(addr1.address)
            const allowedTx = await diploma.getAllowedCreatorByAddress(addr1.address)

            expect(allowedTx).to.equal(false);
        })

        it("should revoque and give back authorization to a creator", async function(){
            const addCreatorTx = await diploma.addCreator(addr1.address, "LILLE 1 FST", "FRANCE")
            const allowedTx = await diploma.getAllowedCreatorByAddress(addr1.address)

            expect(allowedTx).to.equal(true);

            const deleteCreatorTx = await diploma.deleteCreator(addr1.address)
            const allowed2Tx = await diploma.getAllowedCreatorByAddress(addr1.address)

            expect(allowed2Tx).to.equal(false);

            const giveBackTx = await diploma.allowCreator(addr1.address)
            const allowe3dTx = await diploma.getAllowedCreatorByAddress(addr1.address)

            expect(allowe3dTx).to.equal(true);
        })

        it("should not be able to run addCreator function", async function(){
            await expect(
                diploma.connect(addr1).addCreator(addr2.address, "LILLE 1 FST", "FRANCE")
            ).to.be.revertedWith("you cant use this function, only owner of the contract can.")
       
            await expect(
                diploma.connect(addr2).addCreator(addr1.address, "Seoul national university", "Korea")
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
        it("should be able to run createDegree creator only functions", async function(){
            await diploma.addCreator(addr1.address, "LILLE 1 FST", "FRANCE")

            const tx = await diploma.connect(addr1).createDegree(
                "Diploma very first degree",
                addr2.address,
                "Bae",
                "Kang",
                "27/05/2022",
                "Jakarta",
                "Trés Bien"
            )
            
            should.exist(tx)
        })

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
    })

    describe("Degree", function(){
        it("degree should be added to degree list", async function(){
            await diploma.addCreator(addr1.address, "LILLE 1 FST", "FRANCE")
            
            const addDegreeTx = await diploma.connect(addr1).createDegree(
                "Diploma very first degree",
                addr2.address,
                "Bae",
                "Kang",
                "27/05/2022",
                "Jakarta",
                "Trés Bien"
            )
            
            // get degree created
            const degreeTx = await diploma.getAllDegreeFromAddress(addr2.address);

            expect(degreeTx[0]["title"]).to.equal("Diploma very first degree");
            expect(degreeTx[0]["graduate_adress"]).to.equal(addr2.address);
            expect(degreeTx[0]["firstName"]).to.equal("Bae");
            expect(degreeTx[0]["lastName"]).to.equal("Kang");
            expect(degreeTx[0]["date"]).to.equal("27/05/2022");
            expect(degreeTx[0]["location"]).to.equal("Jakarta");
            expect(degreeTx[0]["mention"]).to.equal("Trés Bien");
        })

        it("should retrieve all degrees from an address", async function(){
            await diploma.addCreator(addr1.address, "LILLE 1 FST", "FRANCE")

            
            const addDegreeTx = await diploma.connect(addr1).createDegree(
                "Diploma very first degree",
                addr2.address,
                "Bae",
                "Kang",
                "27/05/2022",
                "Jakarta",
                "Trés Bien"
            )

            const addDegree2Tx = await diploma.connect(addr1).createDegree(
                "Diploma second degree",
                addr2.address,
                "Kim",
                "Park",
                "27/05/2022",
                "Casablanca",
                "Trés Bien"
            )

            const addDegree3Tx = await diploma.connect(addr1).createDegree(
                "Diploma third degree",
                addr2.address,
                "R",
                "V",
                "27/05/2022",
                "Lille",
                "Trés Bien"
            )
            
            // get count of degree from addr2
            const degreeLengthTx = await diploma.getDegreeLengthFromAddress(addr2.address);

            expect(degreeLengthTx).to.equal(3);
        })
    })

    describe("others test", function(){
        it("should get all institute", async function(){
            const addCreatorTx = await diploma.addCreator(addr1.address, "LILLE 1 FST", "FRANCE")
            const addCreator2Tx = await diploma.addCreator(addr2.address, "Seoul national university", "Korea")
            
            const allCreators = await diploma.getAllInstitutes()

            expect(allCreators[0]["name"]).to.equal("LILLE 1 FST");
            expect(allCreators[1]["name"]).to.equal("Seoul national university");
        })
    })
})  