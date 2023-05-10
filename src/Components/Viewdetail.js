import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
    useNavigate
} from 'react-router-dom'
import {
    useSelector
} from 'react-redux'

const Viewdetail = () => {

    const navigate = useNavigate()

    const [userdata, setUserdata] = useState({})

    const lightmode = useSelector((state)=>state.productState.daynightmode)
    console.log(lightmode)

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("user"))
        setUserdata(data)
    },[])

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1>Task6</h1>
                        <div className="task6-view-detail-form-holder">
                            <form>
                                <div className="viewdetail-form-div">
                                    <TextField id="outlined-basic" label="Name" color={lightmode ? "error" : "primary"} variant="outlined" value={userdata.name} className="viewdetail-inp" />
                                </div>
                                <div className="viewdetail-form-div">
                                    <TextField id="outlined-basic" label="Email" color={lightmode ? "error" : "primary"} variant="outlined" value={userdata.email} className="viewdetail-inp" />
                                </div>
                                <div className="viewdetail-form-div">
                                    <TextField id="outlined-basic" label="Body" color={lightmode ? "error" : "primary"} variant="outlined" multiline maxRows={100} value={userdata.body} className="viewdetail-inp" />
                                </div>
                            </form>
                            <div>
                            <Button variant="contained" size="small" className={lightmode && "darktheme"} onClick={()=>navigate("/task6")}>
                                Go Back
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Viewdetail;