import {Form, Col, Button, Card, Alert} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function Allow_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [instituteAddress, setInstituteAddress] = useState(undefined)
    const [allowTx, setTx] = useState(undefined)
    const [alertOn, setAlert] = useState(false)

    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    async function allow(){
        try{
            const correctAddress = ethers.utils.getAddress(instituteAddress.trim())
            console.log(correctAddress)
            const allowTx = await diploma.allowCreator(correctAddress)
            handleAlertShow()
            setTx(allowTx.hash)
            console.log(allowTx)
        }catch(err){
            console.error("[Allow_Institute] allow() : "+err)
        }
    }

    const handleAlertClose = () => setAlert(false);
    const handleAlertShow = () => setAlert(true);

    return (
        <div className="container">
            <Alert variant="success" hidden={!alertOn} transition >
                <Alert.Heading>Institute allowed !</Alert.Heading>
                <p>at : {allowTx}</p>
                <hr/>
                <div className="d-flex justify-content-end">
                <Button onClick={() => handleAlertClose()} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>
            <Card>
            <Card.Body>
                <Card.Title>Allow institute</Card.Title>
                <Card.Text>
                    <Form.Group className="mb-3" controlId="formPlaintextTitle">
                        <Form.Label column >
                            Institute address
                        </Form.Label>
                        <Col>
                            <Form.Control  defaultValue="ethereum address" onChange={(e) => setInstituteAddress(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={() => allow()}>allow</Button>&nbsp;
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    )
}

export default Allow_institute;