import React from 'react'
import "./Checkout.css"
import Subtotal from "./Subtotal.js"
import CheckoutProduct from "./CheckoutProduct.js"
import {useStateValue} from "./StateProvider";


const ad_url="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/BAU/Homemain/XCM_Manual_1500x250_1209699_1077610_1209699_in_home_28_01_20_page_5d027374_166d_466f_9f22_5789bd5e69af_jpg._CB423636511_.jpg"
function Checkout() {
    const [{basket,user},dispatch]=useStateValue();


    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                 className="checkout__ad"
                 src={ad_url} alt=""/>
            

            <div className="checkout__title">
                <h3> Hello,{user?.email}</h3>
                <h2>Your Basket</h2> 
                {basket.map(item =>(
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        img={item.img}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
                

            </div>
            </div>

            <div className="checkout_right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
