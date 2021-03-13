import React,{useEffect, useState} from 'react'
import "./Order.css"
// import Order from "./Order"
import moment from "moment"
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
//library which helps in passing timestamp

function Order(props) {
    return (
        <div className="order">
            <h2> Order</h2>
            <p>{moment.unix(props.order.data.created).format("MMMM Do YYYY,h:ma")}</p>
        
            <p className="order__id">
                <small>{props.order.id}</small> 
            </p>
            {props.order.data.basket?.map(item=>(
                <CheckoutProduct
                    id ={item.id}
                    title={item.title}
                    img={item.img}
                    price={item.price}
                    rating={item.rating} 
                    hidebutton  
                />
            ))}
            <CurrencyFormat
            renderText={(value)=>(
                <h3 className="order__total">Order Total:{value}</h3>
                    
            )}
            decimalScale={2}
            value={props.order.data.amount/100}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"$"}
            />
        </div>
    )
}

export default Order;
