import React from 'react'
import "./Product.css"
import {useStateValue} from "./StateProvider"
import StarIcon from '@material-ui/icons/Star';
import uuid from 'react-uuid';
// this was added fro giving uid ;))

const product_url="https://i.insider.com/5cbe1f80b14bf407f11cf82b?width=1100&format=jpeg&auto=webp"
function Product(props) {
    const [state,dispatch]=useStateValue();
    // This is the REDUX PART!!! 

    const addToBasket =()=>{
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
            id: uuid(),    
            title: props.title,
            img: props.img,
            price: props.price,
            rating: props.rating,
            },
        })
    }


    return (
        <div className="product">
            <div className="product_info">
                <p> {props.title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{props.price}</strong>
                </p>
                <div classname="product_rating">
                    {Array(props.rating).fill()
                    .map((_,i)=>(
                        <StarIcon/>
                    ))}
                    
                </div>
            </div>
             <img className="img" src={props.img} alt=""/>
             <button onClick={addToBasket}>Add to cart</button>
           
        </div>
    )
}

export default Product

// {Array(props.rating).fill()
//                     .map((_,i)=>(
//                         <StarIcon/>
//                     ))}
// this code is used to map rating