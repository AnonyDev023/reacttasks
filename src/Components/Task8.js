import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getinitialdatafromapi } from "../Redux/Product/ProductAction";
import SharedProductCard from "./Shared Components/SharedProductCard";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Task8 = () => {

    // const [open, setOpen] = React.useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const state = useSelector((state)=>state)
    console.log(state)
    const loading = useSelector((state)=>state.productState.loading)
    const products = useSelector((state)=>state.productState.products)
    // console.log(products)

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getinitialdatafromapi())
    },[])

    return (
        <>
            {loading && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task8</h1>
                        <div className="task8-products-holder">
                            {products.map((ele, i)=>{
                                return (
                                    <SharedProductCard data={ele} index={i} key={ele.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Task8;