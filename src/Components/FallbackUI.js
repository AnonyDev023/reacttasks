import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FallbackUI = () => {

    const [open, setOpen] = React.useState(true);

    return (
        <>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <span style={{fontSize: "30px", margin: "0px 10px"}}>Loading</span> <CircularProgress color="inherit" />
                </Backdrop>
        </>
    )
}

export default FallbackUI;