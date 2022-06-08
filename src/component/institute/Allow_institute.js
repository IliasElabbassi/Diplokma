import {Form, Col, Row, Button, Alert} from 'react-bootstrap'
import React, { useEffect, useState } from "react";

function Allow_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [instituteAddress, setInstituteAddress] = useState(undefined)

    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    function allow(){
        try{
            console.log(instituteAddress)
        }catch(err){
            console.error("[Allow_Institute] allow() : "+err)
        }
    }

    return (
        <div className="container">
            <Form.Group className="mb-3" controlId="formPlaintextTitle">
                <p><b>Allow institute</b></p>
                <Form.Label column >
                    Institute address
                </Form.Label>
                <Col>
                    <Form.Control  defaultValue="ethereum address" onChange={(e) => setInstituteAddress(e.target.value)} />
                </Col>
            </Form.Group>

            <Button variant="primary" onClick={() => allow()}>allow</Button>&nbsp;
        </div>
    )
}

export default Allow_institute;