import React, { useEffect, useState } from "react"
import moment from 'moment'
import { useSelector } from "react-redux"

const Task3 = () => {

    const [time, setTime] = useState("")

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    useEffect(()=>{
        setInterval(()=>{
            setTime(moment().format('LTS'))
        },1000)
    },[])

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task3</h1>
                        <h1 className={lightmode ? "time-h1-css darkthemecolor" : "time-h1-css lightthemecolor"}>{time}</h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Task3;