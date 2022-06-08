import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useEffect, useState } from "react";
import {Col} from 'react-bootstrap'

import getBlockchain from '../ethereum.js';

import Manage_institute from './Manage_institute'
import NavbarComponent from './Navbar'
import Diplomas from './diplomas'
import Error404 from './404'

import './style/app.css'

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
        <section className='meta_info text-center'>
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
        <NavbarComponent address={address} /> 
        <Routes>
            <Route path='/diplomas' element={<Diplomas />} />
            <Route path='/managing/institute' element={<Manage_institute
                                                              diploma={diploma}
                                                              address={address} />} />
            <Route element={<Error404 />} />
          </Routes>
        </BrowserRouter>

        <div className='footer_app fixed-bottom'>
          <div className='footer_ele'>
            <Col style={{textAlign: "right"}}>licence <a href='https://mit-license.org/'>MIT</a></Col>
            <Col style={{textAlign: "right"}}>By Ilias El abbassi</Col>
            <Col style={{textAlign: "right"}}>iliaselabbassi@outlook.fr</Col>
            <Col style={{textAlign: "right"}}><a href='https://github.com/IliasElabbassi'>github</a></Col>
          </div>
        </div>

    </div>
  );
}

export default App;
