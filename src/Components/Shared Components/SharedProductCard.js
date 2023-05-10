import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from "react-redux";
import { addtocart, removefromcart } from "../../Redux/Product/ProductAction";
import {
    useNavigate
} from 'react-router-dom'

const SharedProductCard = ({data, index}) => {

    const navigate = useNavigate()

    const stateCart = useSelector((state)=>state.productState.cart)

    const dispatch = useDispatch()

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    return (
        <>
            <Card sx={{ maxWidth: 345, width: 350 }}>
                <CardActionArea onClick={()=>navigate(`/product/${data.id}`)}>
                    <CardMedia
                    component="img"
                    height="300"
                    image={data.image}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.title.length>17 ? data.title.slice(0,17)+"..." : data.title}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        {data.description.length>80 ? data.description.slice(0,80)+"..." : data.description}
                    </Typography> */}
                    </CardContent>
                    <CardContent>
                            <div className="price-p-holder">
                                <p className="rating-price-p">Price: $ {data.price}</p>    
                            </div>
                            <div className="price-p-holder">
                                <p className="rating-price-p">Rating: <Rating name="read-only" value={data.rating.rate} precision={0.1} readOnly /></p>    
                            </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {stateCart.some(prod => prod.id === data.id) ? 
                        <Button variant="contained" style={{width: "100%", backgroundColor: "orange"}} onClick={()=>dispatch(removefromcart(data.id))}>REMOVE FROM CART</Button> :
                        <Button variant="contained" style={{width: "100%"}} className={lightmode && "darktheme"} onClick={()=>dispatch(addtocart(data))}>ADD TO CART</Button>
                        }
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default SharedProductCard;