import React from "react";
import {Col, Row } from 'react-bootstrap'

import "./style/bg.css"

function Home() {
    return (
        <div className="container">
            <Row>
                <Col sm={{offset:3}}>
                        <img  src="/degree_illustration.webp" height={600}  />            
                </Col>
            </Row>
        </div>
    )
}

export default Home;