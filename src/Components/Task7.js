import React, { useState } from "react"
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios'
import { FetchProducts, UploadImgApi } from "../Config/Api";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useSelector } from "react-redux";

const categoryoptions = [
    {
      value: "men's clothing",
      label: "men's clothing",
    },
    {
      value: 'jewelery',
      label: 'jewelery',
    },
    {
      value: 'electronics',
      label: 'electronics',
    },
    {
      value: "women's clothing",
      label: "women's clothing",
    },
  ];

const Task7 = () => {

    const [data, setData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: ""
    })

    const [imgsrc, setImgsrc] = useState("")

    const [val, setVal] = useState({})

    const [open, setOpen] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleInput = (e) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name] : value
        })
    }

    const handleImgInput = (e) => {
        setVal(e.target.files[0])
        setImgsrc(URL.createObjectURL(e.target.files[0]))
    }

    console.log(data)
    console.log(imgsrc)

    const finalproductupload = () => {
        setOpen(true)
        const senddata = {
            title : data.title,
            description : data.description,
            image : data.image,
            category : data.category,
            price : data.price
        }
        axios.post(
            FetchProducts,
            senddata
        )
        .then((response)=>{
            console.log(response)
            setData({
                title: "",
                description: "",
                price: "",
                category: "",
                image: ""
            })
            setImgsrc("")
            setOpen(false)
            handleClickVariant("success")
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const uploadImg = (formdata) => {
        axios.post(
            UploadImgApi,
            formdata
        )
        .then((response)=>{
            console.log(response)
            if (response){
                data.image = response?.data?.Url
                finalproductupload()
            }
        })
        .catch((error)=>[
            console.log(error)
        ])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("image", val, val.name)
        console.log(formdata)
        uploadImg(formdata)
    }

    const handleReset = () => {
        setData({
            title: "",
            description: "",
            price: "",
            category: "",
            image: ""
        })
        setImgsrc("")
    }

    const validateData = () => {
        if(data.title!=="" && data.description!=="" && data.price!=="" && imgsrc!=="" && data.category!==""){
            return false
        }
        else{
            return true
        }
    }

    const validateDataSingly = () => {
        if (data.title.trim()==="" && data.description.trim()==="" && data.price.trim()==="" && imgsrc==="" && data.category===""){
            return true
        }
        else{
            return false
        }
    }

    const handleClickVariant = (variant) => () => {
        enqueueSnackbar('This is a success message!', { variant });
    };

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                    {open && <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task7</h1>
                        <div className="task7-holder-div">
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <div className={lightmode ? "form-img-div bg-div-dark-border" : "form-img-div"}>
                                            {imgsrc && <img src={imgsrc} className="img-form-css" />}
                                            {!imgsrc ? <label htmlFor="img-inp-id">Select Image</label> : <label htmlFor="img-inp-id" className={lightmode ? "change-img-label-css darkthemecolor" : "change-img-label-css"}>Change Image</label> }
                                            <input type="file"  className="img-inp" id="img-inp-id" onChange={handleImgInput}  />
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField fullWidth label="Title" color={lightmode ? "error" : "primary"} id="fullWidth" name="title" value={data.title} onChange={handleInput} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField fullWidth label="Price" color={lightmode ? "error" : "primary"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="price" value={data.price} onChange={handleInput} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField multiline fullWidth label="Description" color={lightmode ? "error" : "primary"} id="fullWidth" name="description" value={data.description} onChange={handleInput} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    fullWidth
                                                    label="Category"
                                                    // defaultValue="EUR"
                                                    // helperText="Please select your currency"
                                                    color={lightmode ? "error" : "primary"}
                                                    name="category"
                                                    onChange={handleInput}
                                                    value={data.category}
                                                    >
                                                    {categoryoptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Button variant="contained" color="success" className="form-btn" onClick={handleSubmit} disabled={validateData()}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button variant="contained" color="warning" className="form-btn" onClick={handleReset} disabled={validateDataSingly()}>
                                                    Reset
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Button onClick={handleClickVariant('success')}>Show success snackbar</Button> */}
        </>
    )
}

export default Task7;