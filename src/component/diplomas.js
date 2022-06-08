import React, { useEffect, useState } from "react";
import { MDBCol } from "mdbreact";

import { Card } from "react-bootstrap";

import "./style/diplomas.css"

function Diplomas() {
    const [diploma, setDiploma] = useState(undefined)
    const [diplomas_list, setDiplomasList] = useState([])

    return (
        <div className="container">
            <MDBCol md="6" className="search_bar offset-md-3">
                <input className="form-control" type="text" placeholder="address" aria-label="Search" />
            </MDBCol>

            <div>
                {
                    (diplomas_list.length === 0)?(
                      <div className="no_diploma offset-md-5">No diplomas to display</div>
                    ) : (
                        'should display the diploma'
                    )
                }
            </div>
        </div>
    )
}

export default Diplomas;