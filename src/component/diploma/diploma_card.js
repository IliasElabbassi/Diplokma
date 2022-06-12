import React, { useEffect, useState } from "react";


function Diploma(props){
    const [info, setInfo] = useState({})

    useEffect(() => {
        setInfo(props.info)
    }, [props.info])

    return (
        <div className="container">
            diploma
        </div>
    )
}

export default Diploma;

