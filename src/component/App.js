import { useEffect, useState } from "react";

import getBlockchain from '../ethereum.js';

import "./style/bg.css"

function App() {
  const [address, setAddress] = useState(undefined)
  const [diploma, setDiploma] = useState(undefined)


  useEffect(() => {
    const init = async () => {
      const { signerAddress, diploma} = await getBlockchain();
      console.log(signerAddress)
      console.log(diploma)
      setDiploma(diploma);
      setAddress(signerAddress)
    };
    init()
  }, []);

  if(typeof diploma === 'undefined'){
    return (
      <div className="App">
        <section className="bg">
          <h1 className="bgh1">
            Diplokma <br></br>
            Please use an app like metamask<br></br>
            to connect to the ethereum newtork
          </h1>
        </section>
      </div>
    )
  }
  return (
    <div className="App">
      <section className="bg">
        <h1 className="bgh1">
          Diplokma
        </h1>
      </section>
    </div>
  );
}

export default App;
