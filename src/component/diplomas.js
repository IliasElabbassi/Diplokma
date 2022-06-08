import React, { useEffect, useState } from "react";
import { MDBCol } from "mdbreact";

import "./style/diplomas.css"

function Diplomas(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [diplomas_list, setDiplomasList] = useState([])

    useEffect(()=>{
        setDiploma(props.diploma)
        getDiplomas()
    }, [props.diploma])

    async function getDiplomas(){
        try {
            const diplomasTx = diploma.getAllDegrees()
            setDiplomasList(diplomasTx)
            console.log(diplomas_list)
        }catch(err){
            console.error("[Diplomas.js] getDiplomas() : "+err)
        }
    }

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