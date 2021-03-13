import React from 'react'
import "./CheckoutProduct.css"
import StarIcon from '@material-ui/icons/Star';
import {useStateValue } from "./StateProvider.js";
import "./CheckoutProduct.css"

function CheckoutProduct(props) {
    const [{basket},dispatch]=useStateValue();

    const remove=()=>{
        // console.log("product id: "+props.id);
        dispatch({
            type:'REMOVE_FROM_BASKET',
            item:{
                id:props.id,
                title: props.title,
                img: props.img,
                price: props.price,
                rating: props.rating,
            }
        })
    }


    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={props.img} />
            
            <div className="CheckoutProduct__info">
                <p className="CheckoutProduct__title">{props.title}</p>
                <p className="CheckoutProduct__price">
                    <small>$</small>
                    <strong>{props.price}</strong>
                </p>
                <div classname="CheckoutProduct__rating">
                    {Array(props.rating).fill()
                    .map((_,i)=>(
                        <StarIcon/>
                    ))}
                    
                </div>
                {!props.hidebutton &&(
                    <button onClick={remove}>Remove from basket</button>                        
                )}
                </div>
        </div>
    )
}

export default CheckoutProduct
