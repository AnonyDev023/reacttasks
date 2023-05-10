import React from "react";
import {
    FETCH_PRODUCTS_INITIATED,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGEMODE
} from "./ProductTypes"

const initialstate = {
    products : [],
    cart : [],
    loading : false,
    error : "",
    daynightmode : false
}

export const ProductReducer = (state=initialstate, action) => {
    switch(action.type){
        case FETCH_PRODUCTS_INITIATED:
            return {
                ...state,
                loading : true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading : false,
                products : action.payload
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading : false,
                products : [],
                error : action.payload
            }
        case ADD_TO_CART:
            return {
                ...state,
                loading : false,
                cart : [...state.cart, action.payload]
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                loading : false,
                cart : [...state.cart.filter(prod=>prod.id !== action.payload)]
            }
        case CHANGEMODE:
            return {
                ...state,
                daynightmode: action.payload
            }
        default:
            return state
    }
}