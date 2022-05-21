const fs = require('fs')
const { ethers } = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log(`Deploying contracts with the account: ${deployer.address}`)
    
    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`)

    const Diploma = await ethers.getContractFactory('diploma')
    const diploma = await Diploma.deploy()
    await diploma.deployed()
    
    console.log(`Token address: ${diploma.address}`)

    const data = {
        address: diploma.address,
        abi: JSON.parse(diploma.interface.format('json'))
    }
    // console.log(JSON.stringify(data))
    fs.writeFileSync('./src/Diploma.json', JSON.stringify(data))
}

main()
    .then(()=> process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })