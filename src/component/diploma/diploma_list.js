import React, { useEffect, useState } from "react"
import { Grid } from "@mui/material"

import Diploma from "./Diploma_card"

import "../style/diplomas.css"

function Diploma_list(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [diplomas_list, setDiplomasList] = useState([])

    useEffect(()=>{
        setDiploma(props.diploma)
        setDiplomasList(props.list)
        console.log("list :")
        console.log(diplomas_list)
    },[props.list])


    return (
        <div className="container row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center">
            {
                props.list.map((dipl, idx)=>{
                    return <Diploma diploma={diploma} key={idx} info={dipl} idx={idx}/>
                })
            }
        </div>
    )
}

export default Diploma_list;