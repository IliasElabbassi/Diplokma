import React, { useEffect, useState } from "react";
import {Form, Col, Row, Button, Card, Alert} from 'react-bootstrap'
import { ethers } from "ethers";

import "../style/diplomas.css"

function Create_diploma(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [createTx, setTx] = useState(undefined)
    const [alertOn, setAlert] = useState(false)

    const [title, setTitle] = useState(undefined)
    const [to, setTo] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [firstName, setFirstName] = useState(undefined)
    const [date, setDate] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [mention, setMention] = useState(undefined)


    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    async function create(){
        try{
            if(title == undefined || to == undefined || lastName == undefined || firstName == undefined || date == undefined ||
                location == undefined || mention == undefined)
            {
                    console.error("[Create_diploma] create() : all inputs should be assigned")
                    return
            }
            const correctAddress = ethers.utils.getAddress(to.trim())
            console.log(correctAddress)
            const createTx = await diploma.createDegree(
                title,
                correctAddress,
                firstName,
                lastName,
                date,
                location,
                mention
            )
            setTx(createTx.hash)
            handleAlertShow()
            console.log(title)
            console.log(correctAddress)
            console.log(firstName)
            console.log(lastName)
            console.log(date)
            console.log(location)
            console.log(mention)

        }catch(err){
            console.error("[Create_diploma] create() : "+err)
        }
    }

    const handleAlertClose = () => setAlert(false);
    const handleAlertShow = () => setAlert(true);

    return (
        <div className="container">
            <Alert variant="success" hidden={!alertOn} transition >
                <Alert.Heading>Degree Created !</Alert.Heading>
                <p>at : {createTx}</p>
                <hr/>
                <div className="d-flex justify-content-end">
                <Button onClick={() => handleAlertClose()} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>
            <Row>
                <Col md={7} className="offset-md-2">
                    <Card className="create_diploma shadow p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            <Card.Title>Create degree</Card.Title>
                            <Card.Text>
                                <Form.Group className="mb-3" controlId="formPlaintextTitle">
                                    <Form.Label column >
                                        degree title
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="name" onChange={(e) => setTitle(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        to
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="ethereum address" onChange={(e) => setTo(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        firstName
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="Firstname" onChange={(e) => setFirstName(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        Lastname
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="Lastname" onChange={(e) => setLastName(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        date
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="date" defaultValue="ethereum address" onChange={(e) => setDate(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        Location
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="Location" onChange={(e) => setLocation(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        Mention
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="Mention" onChange={(e) => setMention(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" onClick={() => create()}>add</Button>&nbsp;
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
}

export default Create_diploma;