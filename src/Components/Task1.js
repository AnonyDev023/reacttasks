import React, { useState } from "react"
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";

const Task1 = () => {

    const [newcolor, setColor] = useState("")

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task1</h1>
                        <div className="task1-holder-div">
                            <div className={lightmode ? "bg-div bg-div-dark-border" : "bg-div"} style={{background: newcolor}}></div>
                            <div className="inp-holder-div">
                                <TextField id="outlined-basic" className="color-inp" label="Color" color={lightmode ? "error" : "primary"} variant="outlined" onChange={(e)=>setColor(e.target.value)} style={{borderColor: newcolor}} />
                                {/* <input type="text" name="color" onChange={(e)=>setColor(e.target.value)} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Task1;