import React,{useState, useEffect} from 'react'
import "./Payment.css"
import {useStateValue} from './StateProvider';
import CheckoutProduct from "./CheckoutProduct"
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "./reducer"; 
import {Link,useHistory} from "react-router-dom"
import {CardElement ,useStripe,useElements} from "@stripe/react-stripe-js"
import axios from './axios';
import {db } from './firebase'
// axios starts with lower case
//  since it is not a component by BEM condition

function Payment() {

    const [{basket,user}, dispatch] =useStateValue();
    const history=useHistory();

    // these are hooks
    const stripe =useStripe();
    const elements = useElements();

    // fro button click eligibility
    const [error,setError] =useState(null);
    const [disabled,setDisabled] =useState(true);

    // for stripe
    const [clientSecret,setClientSecret]=useState(true);
    const [succeeded,setSucceded]=useState(false);
    const [processing,setProcessing]=useState("");

    useEffect(() => {
        //specail stripe secret that allows us to charge
        // console.log("useeffect");
        
        const getClientSecret =async ()=>{

            // console.log("inside async");
            const response=await axios({
                method: 'post',
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
            
            // console.log("response is: ",response);
        }
        
        getClientSecret();
    }, [basket])

    console.log("the client Secret",clientSecret)

    const handleSubmit = async (event)=>{
        // the stripe stuff
        event.preventDefault();
        // this prevents refreshing
        setProcessing(true);
        // prevents button from getting clicked multiple times

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //pay_Intent confirms payment
            
            // it caused a problem user.uid not user.id
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket:basket,
                amount: paymentIntent.amount,
                created:paymentIntent.created
            })
            // there was a huge Cross-Origin-Request-Block error which apparently
            // comes if local host on firefox ,but works on Chrome,Safari 

            setSucceded(true);
            setError(null);
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }

    const handleChange = event=>{
        //Listen for errors and display errors 
        // when customer types card details.
        setDisabled(event.empty);
        setError(event.error ? event.error.message: "");
    }
    // if the event is empty then disable the button else

    return (
        <div className="payment">
            <div className="payemnt__container">

                <h1>
                    Checkout (
                        <Link to="/checkout"> {basket?.length} items</Link>
                        )
                </h1>


                 {/* Payment section -delivery address */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>

                    <div className="payment__address">
                        <p > {user?.email}</p>
                        <p> 360/192 A.</p>
                        <p>Allapur,Prayagraj</p>
                    </div>
                 </div>

                 {/* Payment section - Review Items */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payement__items">
                        {basket.map(item=>(
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
                 
                 {/* Payment section -Payment method */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe magic */}

                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange}/>

                            <div className="payment__last">
                                <CurrencyFormat
                                    renderText={(value)=>(
                                                <h3> Order Total: {value} </h3>
                                            )}
                                            decimalScale={2}
                                            value={getBasketTotal(basket)}
                                            displayType={"text"}
                                            thousandSeperator={true}
                                            prefix={"$"}
                                />

                                <button disabled={processing || disabled||succeeded}>
                                        <span>{processing ?<p>Processing</p>:
                                                    "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default Payment
