import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import Create_institute from "./create_institute"
import Revoke_institute from "./revoke_nstitute"
import Allow_institute from "./Allow_institute"
import List_institute from "./list_institute";

import '../style/institute.css'

function Manage_institute(props) {
    const [connectedAddress, setAddress] = useState(undefined)
    const [diploma, setDiploma] = useState(undefined)

    useEffect(()=>{
        setDiploma(props.diploma)
        setAddress(props.address)
    }, [props.diploma, props.address])

    return (
        <div className="container">
            {
            (connectedAddress === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")?(
                <div className="inst_manager ">
                    <Row>
                        <Col md={4}>
                            <Create_institute diploma={diploma} />
                        </Col>
                        <Col md={4}>
                            <Revoke_institute diploma={diploma} />
                        </Col>
                        <Col md={4}>
                            <Allow_institute diploma={diploma} />
                        </Col>
                    </Row>
                </div>

            ) : (
                <div className="only_owner offset-md-3">
                    Only address <b>0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266</b> can <u>manage institutes</u> for the moment 
                </div>
            )
            }
            <hr></hr>
            <p><b>List of all institues</b></p>
            <List_institute diploma={diploma} />
        </div>
    )
}

export default Manage_institute;