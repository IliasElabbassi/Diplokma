import { checkProperties } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { ListGroup } from 'react-bootstrap'

function List_institute(props) {
    const [diploma, setDiploma] = useState(undefined)
    const [institues, setInstituteAddress] = useState(undefined)
    const list_render = []

    useEffect(()=>{
        setDiploma(props.diploma)
        retrieveInstitute()
    }, [props.diploma])

    async function retrieveInstitute(){
        try{
            const listTx = await props.diploma.getAllInstitutes()
            setInstituteAddress(listTx)
            console.log(institues)
        }catch(err){
            console.error("[List_institute] retrieveInstitute() : "+err)
        }
    }

    // institues.array.forEach(element => {
    //     list_render.push(<ListGroup.Item>Lille 1, France allowed</ListGroup.Item>)
    // });

    return (
        <div className="container">
            <ListGroup>
                {list_render}
            </ListGroup>
        </div>
    )
}

export default List_institute;