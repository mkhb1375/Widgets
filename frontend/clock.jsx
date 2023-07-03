import React, { useState, useEffect } from "react";
const moment = require('moment-jalaali');
export default function Clock() {

    const [date, setDate] = useState(new Date);

    useEffect(() => {
        const intervalId = setInterval(dateChange, 1000);
        return () => { clearInterval(intervalId); }

    }, [])

    


    function dateChange() { setDate(new Date) }

    const fromatTime = () => (date.toLocaleTimeString(undefined, { hour12: false }));
    const formatDate = () => (moment(date).format('jYYYY/jM/jD'));
    const formatDate2 = () => (date.toLocaleDateString());
    return (
        <div style={{ fontFamily: "caprasimo" }} className="col  bg-secondary text-white container p-3 m-3 rounded  ">
            <div  className="row ">
                
                <span className="col display-5 text-center">{fromatTime()}</span>
            </div>
            
                
                
            
            <div  className="row h2 ">
                <span className="col text-start">{formatDate()}</span>
                <span className="col text-end">{formatDate2()}</span>
            </div>
        </div>



    )
}

