import React from "react";
import axios from "axios";
import {
    FETCH_PRODUCTS_INITIATED,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGEMODE
} from "./ProductTypes"
import { FetchProducts } from "../../Config/Api";

export const fetchproductsinitial = () => {
    return {
        type : FETCH_PRODUCTS_INITIATED
    }
}

export const fetchproductssuccess = (products) => {
    return {
        type : FETCH_PRODUCTS_SUCCESS,
        payload : products
    }
}

export const fetchproductsfailure = (error) => {
    return {
        type : FETCH_PRODUCTS_FAILURE,
        payload : error
    }
}

export const addtocart = (product) => {
    return {
        type : ADD_TO_CART,
        payload : product
    }
}

export const removefromcart = (id) => {
    return {
        type : REMOVE_FROM_CART,
        payload : id
    }
}

export const changethemode = (value) => {
    return {
        type : CHANGEMODE,
        payload : value
    }
}

export const getinitialdatafromapi = () => async (dispatch) => {
    console.log("hello main")
    dispatch(fetchproductsinitial())
    try{
        const getdata = await axios.get("https://fakestoreapi.com/products")
        console.log("hello main")
        dispatch(fetchproductssuccess(getdata?.data))
    }
    catch(error){
        dispatch(fetchproductsfailure(error?.message))
    }
}
