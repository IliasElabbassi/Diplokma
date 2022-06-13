import React, { useEffect, useState } from "react";
import { ListGroup, Button} from 'react-bootstrap'

import "../style/institute.css"

function List_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [institues, setInstitues] = useState([])
    
    useEffect(()=>{
        setDiploma(props.diploma)
    }, [props.diploma])

    async function retrieveInstitute(){
        try{
            let inst = []
            const listTx = await props.diploma.getAllInstitutes()
            for(let i = 0; i < listTx.length; i++){
                inst.push(
                    await props.diploma.getInstituteFromAddress(listTx[i][2].trim())
                )
            }
            setInstitues(inst)
            console.log(inst)
        }catch(err){
            console.error("[List_institute] retrieveInstitute() : "+err)
        }
    }

    return (
        <div className="container">
            <Button variant="primary" onClick={() => retrieveInstitute()}>retrieve all institues</Button>&nbsp;
            <div class="table-wrapper-scroll-y">
            <table class="table table-bordered table-striped mb-0">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">institue Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">ethereum address</th>
                    <th scope="col">Allowed</th>
                </tr>
                </thead>
                <tbody>

                {
                    institues.map((inst, idx)=>{
                        return <tr key={idx}><th scope="row">{idx}</th><td>{inst[0]}</td><td>{inst[1]}</td><td>{inst[2]}</td><td>{(inst[3]===true)?("Allowed"):("not Allowed")}</td></tr>
                    })
                }
                </tbody>
            </table>

            </div>
        </div>
    )
}

export default List_institute;