import React, { useEffect, useState } from "react";
import {Card} from 'react-bootstrap'
import { Grid } from "@mui/material";

function Diploma(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [info, setInfo] = useState(undefined)
    const [institute, setInstitute] = useState(undefined)
    const [idx, setIdx] = useState(0)

    useEffect(()=>{
        setInfo(props.info)
        setIdx(props.idx)
        setDiploma(props.diploma)
        getInstitute()
    },)

    async function getInstitute(){
        try {
            const instTx = await props.diploma.getInstituteFromAddress(info["creator_adress"])
            setInstitute(instTx)
        } catch (error) {
            console.error("[Diploma_card] getInstitute() : "+error)
        }
    }


    return (
        <div className="container" md={3}>
            {
                (info === undefined || institute === undefined)?(
                    <div className="no_diploma offset-md-5">...</div>
                  ) : (
                    <Card key={idx} className="col my-3 shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                        <Card.Title>{info["title"]}</Card.Title>
                        <Card.Text>
                            <p>LastName: <b>{info["lastName"]}</b></p>
                            <p>FirstName: <b>{info["firstName"]}</b></p>
                            <p>Graduate address: <b>{info["graduate_adress"]}</b></p>
                            <p>from: <b>{info["creator_adress"]}</b></p>
                            <p>institute: <b>{institute["name"]}</b></p>
                            <p>date: <b>{info["date"]}</b></p>
                            <p>Country: <b>{info["location"]}</b></p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                )
            }
            
        </div>
    )
}

export default Diploma;