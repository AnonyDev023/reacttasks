import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { FetchProducts } from "../Config/Api";
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { addtocart, removefromcart } from "../Redux/Product/ProductAction";
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';

const ViewProduct = () => {

    const state = useSelector((state)=>state.productState.cart)
    console.log(state)

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const [product, setProduct] = useState({})

    const param = useParams()
    console.log(param)

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    useEffect(()=>{
        setLoading(true)
        axios.get(FetchProducts+"/"+param.id)
        .then((response)=>{
            console.log(response?.data)
            setProduct(response?.data)
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error)
            setLoading(false)
        })
    },[])

    // console.log(product.rating.rate)

    return (
            // {loading && <h1>Loading...</h1>}
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1>Product : {product.title}</h1>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <img src={product.image} style={{height: "400px"}} />
                        </div>
                        <div>
                            <p className="detail-product-p">Description : {product.description}</p>
                        </div>
                        <div>
                            <p className="detail-product-p">Category : {product.category}</p>
                        </div>
                        <div>
                            <p className="detail-product-p">Price : $ {product.price}</p>
                        </div>
                        {/* <div>
                            <p className="detail-product-p">Rating : <Rating name="read-only" value={product.rating.rate} precision={0.1} readOnly /></p>
                        </div> */}
                        <div>
                            {state.some(prod => prod.id === product.id) ? 
                            <Button variant="contained" style={{width: "100%", backgroundColor: "orange"}} onClick={()=>dispatch(removefromcart(product.id))}>REMOVE FROM CART</Button> :
                            <Button variant="contained" style={{width: "100%"}} className={lightmode && "darktheme"} onClick={()=>dispatch(addtocart(product))}>ADD TO CART</Button>    
                        }
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default ViewProduct;