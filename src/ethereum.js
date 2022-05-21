import { ethers, Contract } from 'ethers';
import Diploma  from "./Diploma.json";

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        const diploma = new Contract(
          Diploma.address,
          Diploma.abi,
          signer
        );

        resolve({signerAddress, diploma});
      }
      resolve({signerAddress: undefined, diploma: undefined});
    });
  });

export default getBlockchain;