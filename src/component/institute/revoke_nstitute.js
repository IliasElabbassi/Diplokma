import {Form, Col, Button, Card, Alert} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function Revoke_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [instituteAddress, setInstituteAddress] = useState("")
    const [revokeTx, setTx] = useState(undefined)
    const [alertOn, setAlert] = useState(false)

    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    async function revoke(){
        try{
            const correctAddress = ethers.utils.getAddress(instituteAddress.trim())
            console.log(correctAddress)
            const revokeTx = await diploma.deleteCreator(correctAddress)
            handleAlertShow()
            console.log(revokeTx)
        }catch(err){
            console.error("[Revoke_Institute] revoke() : "+err)
        }
    }
    
    const handleAlertClose = () => setAlert(false);
    const handleAlertShow = () => setAlert(true);

    return (
        <div className="container">
            <Alert variant="success" hidden={!alertOn} transition >
                <Alert.Heading>Institute revoked !</Alert.Heading>
                <p>at : {revokeTx}</p>
                <hr/>
                <div className="d-flex justify-content-end">
                <Button onClick={() => handleAlertClose()} variant="outline-success">
                    Close
                </Button>
                </div>
            </Alert>
            <Card>
            <Card.Body>
                <Card.Title>Revoke institute</Card.Title>
                <Card.Text>
                    <Form.Group className="mb-3" controlId="formPlaintextTitle">
                        <Form.Label column >
                            Institute address
                        </Form.Label>
                        <Col>
                            <Form.Control  defaultValue="ethereum address" onChange={(e) => setInstituteAddress(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={() => revoke()}>revoke</Button>&nbsp;

                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    )
}

export default Revoke_institute;