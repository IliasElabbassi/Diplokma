import React, { useEffect, useState } from "react";
import { ListGroup, Button} from 'react-bootstrap'

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
            <ListGroup>
                {
                    institues.map((inst, idx)=>{
                        return <ListGroup.Item variant="light">{inst[0]} , {inst[1]} , {inst[2]} , {(inst[3]===true)?("Allowed"):("not Allowed")}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    )
}

export default List_institute;