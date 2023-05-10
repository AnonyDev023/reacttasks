import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    NavLink,
    Link,
    useLocation,
    useNavigate
} from 'react-router-dom'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from "react-redux";
import DayNightToggle from 'react-day-and-night-toggle'
import { changethemode } from "../../Redux/Product/ProductAction";

const drawerWidth = 240;
const navItems = ['Task1', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6', 'Task7', 'Task8'];

const Topnav = (props) => {

    const {pathname} = useLocation()

    console.log(pathname)

    const lightmode = useSelector((state)=>state.productState.daynightmode)
    console.log(lightmode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const stateCart = useSelector((state)=>state.productState.cart)
    console.log(stateCart.length)

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }} onClick={()=>navigate("/task1")}>
            React Tasks
        </Typography>
        <Divider />
        <List>
            {navItems.map((item) => (
            <ListItem key={item} disablePadding onClick={()=>navigate(`/${item.toLowerCase()}`)}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item} className={[`/${item.toLowerCase()}`].includes(pathname) ? "navlink activenavlink" : "navlink"} />
                </ListItemButton>
            </ListItem>
            ))}
            <ListItem onClick={()=>navigate("/cart")}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <Badge badgeContent={stateCart.length} color="warning">
                        <i className={`fa fa-shopping-cart ${["/cart"].includes(pathname) ? "navlink activenavlink" : "navlink"}`} style={{fontSize: "15px"}}></i>
                    </Badge> 
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <DayNightToggle onChange={()=>dispatch(changethemode(!lightmode))} checked={lightmode} />
                </ListItemButton>
            </ListItem>
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" className={lightmode && "darktheme"}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        onClick={()=>navigate("/task1")}
                    >
                        React Tasks
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <span key={item} onClick={()=>navigate(`/${item.toLowerCase()}`)}>
                                <Button key={item} sx={{ color: '#fff' }} className={[`/${item.toLowerCase()}`].includes(pathname) ? "navlink activenavlink" : "navlink"}>
                                    {item}
                                </Button>
                            </span>
                        ))}
                        <span>
                            <Button sx={{ color: '#fff' }} onClick={()=>navigate("/cart")}>
                                <Badge badgeContent={stateCart.length} color="warning">
                                    <i className={`fa fa-shopping-cart ${["/cart"].includes(pathname) ? "navlink activenavlink" : "navlink"}`} style={{fontSize: "15px"}}></i>
                                </Badge>    
                            </Button>
                        </span>
                        <span>
                            <Button sx={{ color: '#fff' }}>
                                <DayNightToggle onChange={()=>dispatch(changethemode(!lightmode))} checked={lightmode} />   
                            </Button>
                        </span>
                    </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    >
                    {drawer}
                    </Drawer>
                </Box>
            </Box>
        </>
    )
}

export default Topnav;