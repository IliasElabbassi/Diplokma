import React, { useEffect, useState } from "react";
import {Form, Col, Button, Card, Alert} from 'react-bootstrap'

function Create_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [country, setCountry] = useState(undefined)
    const [instituteAddress, setInstituteAddress] = useState(undefined)
    const [createInstTx, setTx] = useState(undefined)
    const [alertOn, setAlert] = useState(false)

    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    async function add(){
        try{
            const createTx = await diploma.addCreator(instituteAddress, name, country)
            handleAlertShow()
            console.log(createTx)
            console.log(name)
            console.log(country)
            console.log(instituteAddress)
        }catch(err){
            console.error("[Create_Institute] add() : "+err)
        }
    }

    const handleAlertClose = () => setAlert(false);
    const handleAlertShow = () => setAlert(true);

    return (
        <div className="container">
            <Alert variant="success" hidden={!alertOn} transition >
                <Alert.Heading>Institute Created !</Alert.Heading>
                <p>at : {createInstTx}</p>
                <hr/>
                <div className="d-flex justify-content-end">
                <Button onClick={() => handleAlertClose()} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>
            <Card>
            <Card.Body>
                <Card.Title>Create institute</Card.Title>
                <Card.Text>
                    <Form.Group className="mb-3" controlId="formPlaintextTitle">
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
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    )
}

export default Create_institute;