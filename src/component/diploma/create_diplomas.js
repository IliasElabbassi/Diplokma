import React, { useEffect, useState } from "react";
import {Form, Col, Row, Button, Card, Alert} from 'react-bootstrap'

import "../style/diplomas.css"

function Create_diploma(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [createInstTx, setTx] = useState(undefined)
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
            handleAlertShow()
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
                <p>at : {createInstTx}</p>
                <hr/>
                <div className="d-flex justify-content-end">
                <Button onClick={() => handleAlertClose()} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>
            <Row>
                <Col md={7} className="offset-md-2">
                    <Card className="create_diploma">
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
                                        <Form.Control  defaultValue="country" onChange={(e) => setTo(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        firstName
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="ethereum address" onChange={(e) => setFirstName(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        lastname
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="ethereum address" onChange={(e) => setLastName(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        date
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="date" defaultValue="ethereum address" onChange={(e) => setDate(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        location
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="ethereum address" onChange={(e) => setLocation(e.target.value)} />
                                    </Col>
                                    <Form.Label column >
                                        Mention
                                    </Form.Label>
                                    <Col>
                                        <Form.Control  defaultValue="ethereum address" onChange={(e) => setMention(e.target.value)} />
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