import React from "react";
import { useSelector } from "react-redux";
import SharedProductCard from "./Shared Components/SharedProductCard";

const Cart = () => {

    const state = useSelector((state) => state.productState)
    console.log(state)

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Cart</h1>
                        <div className="task8-products-holder">
                            {state.cart.length===0 ? <h1 className={lightmode ? "empty-cart-h1 darkthemecolor" : "empty-cart-h1 lightthemecolor"}>Empty Cart</h1> : state.cart.map((ele,i)=>{
                                return (
                                    <SharedProductCard data={ele} index={i} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart;