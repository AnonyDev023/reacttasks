import React, { useEffect, useState } from "react"
import axios from 'axios'
import { FetchPosts } from "../Config/Api"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Task5 = () => {

    const [search, setSearch] = useState("")

    const [posts, setPosts] = useState([])

    const [open, setOpen] = React.useState(false);

    const [opendialogbox, setOpendialogbox] = React.useState(false);
    
    const [dBData, setdBData] = useState({})

    const handleClickOpen = (ele) => {
        setdBData(ele)
        setOpendialogbox(true);
    };
    
      const handleClose = () => {
        setOpendialogbox(false);
    };

    useEffect(()=>{
        setOpen(true)
        axios.get(
            FetchPosts,
            {
                headers: {
                    "Authorization": "Auth Token"
                }
            }
        )
        .then((response)=>{
            console.log(response?.data)
            setPosts(response?.data)
            setOpen(false)
        })
        .catch((error)=>[
            console.log(error)
        ])
    },[])

    console.log(dBData)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const filterarray = posts.filter((ele,i)=>{
        if(search===""){
            return ele
        }
        else if(ele.userId.toString()===search || ele.id.toString()===search || ele.body.toLowerCase().includes(search) || ele.title.toLowerCase().includes(search)){
            return ele
        }
    })

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task5</h1>
                        <div className="task5-search-holder-div">
                            <Search>
                                <SearchIconWrapper>
                                <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearch}
                                value={search}
                                />
                            </Search>
                        </div>
                        <div className="task5-posts-holder">
                            {filterarray.length===0 ? <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>No Matching Post</h1> : filterarray.map((ele, i)=>{
                                return (
                                    <Card sx={{ maxWidth: 345 }}key={i} elevation={7}>
                                        <CardActionArea>
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {ele.title.length>33 ? ele.title.slice(0,33)+"..." : ele.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {ele.body.length>100 ? ele.body.slice(0,100)+"..." : ele.body }
                                            </Typography>
                                            </CardContent>
                                            <CardContent>
                                            <Button variant="contained" size="small" fullWidth onClick={()=>handleClickOpen(ele)} className={lightmode && "darktheme"}>
                                                View More
                                            </Button>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <Dialog
                open={opendialogbox}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{dBData.title}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {dBData.body}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Okay</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Task5;