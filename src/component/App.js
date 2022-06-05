import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Grid, Col, Row} from 'react-bootstrap'
import { useEffect, useState } from "react";

import getBlockchain from '../ethereum.js';

import NotFound from './404'

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
        <section>
          <h1>
            Diplokma <br></br>
            Please use an app like metamask<br></br>
            to connect to the ethereum newtork<br></br>
            <a href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-Started-With-MetaMask">check here</a>
          </h1>
        </section>
      </div>
    )
  }
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
              <Route element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div>
          <Col style={{textAlign: "right"}}>licence <a href='https://mit-license.org/'>MIT</a></Col>
          <Col style={{textAlign: "right"}}>By Ilias El abbassi</Col>
          <Col style={{textAlign: "right"}}>iliaselabbassi@outlook.fr</Col>
          <Col style={{textAlign: "right"}}><a href='https://github.com/IliasElabbassi'>github</a></Col>
        </div>

    </div>
  );
}

export default App;
