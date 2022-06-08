import React, { useEffect, useState } from "react";
import {Form, Col, Row, Button, Alert} from 'react-bootstrap'

function Create_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [country, setCountry] = useState(undefined)
    const [instituteAddress, setInstituteAddress] = useState(undefined)

    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    function add(){
        try{
            console.log(name)
            console.log(country)
            console.log(instituteAddress)
        }catch(err){
            console.error("[Create_Institute] add() : "+err)
        }
    }

    return (
        <div className="container">
            <Form.Group className="mb-3" controlId="formPlaintextTitle">
                <p><b>Add institute</b></p>
                <Form.Label column >
                    Institute title
                </Form.Label>
                <Col>
                    <Form.Control  defaultValue="name" onChange={(e) => setName(e.target.value)} />
                </Col>
                <Form.Label column >
                    Institute country
                </Form.Label>
                <Col>
                    <Form.Control  defaultValue="country" onChange={(e) => setCountry(e.target.value)} />
                </Col>
                <Form.Label column >
                    Institute address
                </Form.Label>
                <Col>
                    <Form.Control  defaultValue="ethereum address" onChange={(e) => setInstituteAddress(e.target.value)} />
                </Col>
            </Form.Group>

            <Button variant="primary" onClick={() => add()}>add</Button>&nbsp;
        </div>
    )
}

export default Create_institute;