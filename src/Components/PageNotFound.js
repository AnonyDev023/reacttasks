import React from "react";
import Button from '@mui/material/Button';
import {
    useNavigate
} from 'react-router-dom'

const PageNotFound = () => {

    const navigate = useNavigate()

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1>Page Not Found</h1>
                        <Button variant="contained" onClick={()=>navigate("/task1")}>Go TO TASK1</Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PageNotFound;