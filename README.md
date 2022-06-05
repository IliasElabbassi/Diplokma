# Diplokma, interracting with Ethereum

### requirements

To launch the app you need node.js

run
```bash
cd into-the-clone-repo
npm install
```

into another cmd interface you need to run this command to run a local ethereum network

```bash
cd into-the-clone-repo
npx hardhat node
```

and then going back to the first command line interface, you need to generate the contract abi, by running this command :
```bash
npx hardhat run ./Scripts/Deploy.js --network localhost
```

to launch the app :
```bash
yarn start
```

### Diplokma system



### TODO

- create inteface to view all diplomas
- create interface to view diploma from a specific address
- create interface to create a diploma
- create interface to add/delete an institute
- create institure interface
    - in this interface : add diplomas
