import React from "react";
import { MDBCol } from "mdbreact";

import "./style/diplomas.css"

function Diplomas() {
    return (
        <div className="container">
            <MDBCol md="6" className="search_bar offset-md-3">
                <input className="form-control" type="text" placeholder="address" aria-label="Search" />
            </MDBCol>
        </div>
    )
}

export default Diplomas;