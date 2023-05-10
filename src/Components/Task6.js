import React, { useEffect, useState } from "react"
import axios from 'axios'
import { FetchComments } from "../Config/Api"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    useNavigate
} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Task6 = () => {

    const navigate = useNavigate()

    const [userdata, setUserdata] = useState([])

    const [tableHeadings, setTableheadings] = useState([])
    
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(()=>{
        setOpen(true)
        axios.get(
            FetchComments,
            {
                headers: {
                    "Authorization" : "Auth Token"
                }
            }
        )
        .then((response)=>{
            console.log(response?.data)
            setUserdata(response?.data)
            setTableheadings(Object.keys(response?.data[0]))
            setOpen(false)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    const setlocally = (ele) => {
        navigate("/viewdetailuser")
        localStorage.setItem("user", JSON.stringify(ele))
    }

    console.log(tableHeadings)

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task6</h1>
                        <div className="table-holder-div">
                        {open ? <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop> : 
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    {tableHeadings.map((ele,i)=>{
                                        return (
                                            <StyledTableCell key={i} className={lightmode && "darktheme"}>{ele[0].toUpperCase()+ele.slice(1)}</StyledTableCell>
                                        )
                                    })}
                                    <StyledTableCell className={lightmode && "darktheme"}>View More</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {userdata.map((ele,i) => (
                                    <StyledTableRow key={ele.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {ele.postId}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{ele.id}</StyledTableCell>
                                    <StyledTableCell align="center">{ele.name.length>20 ? ele.name.slice(0,20)+"..." : ele.name}</StyledTableCell>
                                    <StyledTableCell align="center">{ele.email}</StyledTableCell>
                                    <StyledTableCell align="center">{ele.body.length>50 ? ele.body.slice(0,50)+"..." : ele.body}</StyledTableCell>
                                    <StyledTableCell align="center"><i class="fa fa-link" onClick={()=>setlocally(ele)}></i></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer> }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Task6;