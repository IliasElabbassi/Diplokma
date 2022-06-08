import React, { useEffect, useState } from "react";
import {Form, Col, Row, Button, Alert} from 'react-bootstrap'

function Revoke_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [instituteAddress, setInstituteAddress] = useState(undefined)

    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    function revoke(){
        try{
            console.log(instituteAddress)
        }catch(err){
            console.error("[Revoke_Institute] revoke() : "+err)
        }
    }

    return (
        <div className="container">
            <Form.Group className="mb-3" controlId="formPlaintextTitle">
                <p><b>Revoke institute</b></p>
                <Form.Label column >
                    Institute address
                </Form.Label>
                <Col>
                    <Form.Control  defaultValue="ethereum address" onChange={(e) => setInstituteAddress(e.target.value)} />
                </Col>
            </Form.Group>

            <Button variant="primary" onClick={() => revoke()}>revoke</Button>&nbsp;
        </div>
    )
}

export default Revoke_institute;