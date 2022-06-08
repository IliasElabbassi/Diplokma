import React, { useEffect, useState } from "react";

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
            (connectedAddress == "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")?(
                <div className="offset-md-5">
                    <p>You can add institute</p>
                    <p>You can revoke institute</p>
                    <p>You can allow institute</p>
                </div>
            ) : (
                <div className="offset-md-3">
                    Only address 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 can manage institutes for the moment 
                </div>
            )
            }
        </div>
    )
}

export default Manage_institute;