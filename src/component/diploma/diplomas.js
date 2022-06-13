import React, { useEffect, useState } from "react";
import { MDBCol } from "mdbreact";
import { ethers } from "ethers";

import Diploma_list from "./diploma_list"

import "../style/diplomas.css"


function Diplomas(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [diplomas_list, setDiplomasList] = useState([])
    const [input, setInput] = useState(undefined)

    useEffect(()=>{
        if(diploma === undefined)
            setDiploma(props.diploma)
        getDiplomas()
    }, [props.diploma, input])

    async function getDiplomas(){
        try {
            console.log("input : "+input)
            if(input !== undefined){
                const correctAddress = ethers.utils.getAddress(input.trim())
                console.log(correctAddress)
                const diplomasTx = await props.diploma.getAllDegreeFromAddress(correctAddress)
                setDiplomasList(diplomasTx)
            }else{
                const diplomasTx = await props.diploma.getAllDegrees()
                setDiplomasList(diplomasTx)
            }
        }catch(err){
            console.error("[Diplomas.js] getDiplomas() : "+err)
        }
    }

    function test(event){
        if(event.target.value == "")
            setInput(undefined)
        else
            setInput(event.target.value)
        
        console.log(input)
        console.log(event.target.value)
    }

    return (
        <div className="container">
            <MDBCol md="6" className="search_bar offset-md-3">
                <input className="form-control" type="text" placeholder="address" aria-label="Search" onChange={test} />

            </MDBCol>

            <div>
                {
                    (diplomas_list.length === 0)?(
                      <div className="no_diploma offset-md-5">No diplomas to display</div>
                    ) : (
                        <Diploma_list diploma={diploma} list={diplomas_list}/>
                    )
                }
            </div>
        </div>
    )
}

export default Diplomas;