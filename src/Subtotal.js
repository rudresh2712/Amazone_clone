import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format";
import {useStateValue} from "./StateProvider";
import {getBasketTotal} from "./reducer"; 
import {useHistory} from "react-router-dom" 
//this thing is proffessional practise of 
// pulling the total via a Selector.*****

function Subtotal() {

    const history=useHistory();
    const [{basket},dispatch] =useStateValue();


    return (
        <div className="subtotal">
        <CurrencyFormat
            renderText={(value)=>(
                <>
                    <p>
                    Subtotal({basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                      <input type="checkbox"/>This order
                      contains a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"$"}
        />
        <button onClick={e=> history.push('/payment')}>Proceed to checkout</button>
            {/* history.push helps in keeping the styling of the button as it is,
            else it changes to link  */}
        </div>
    )
}

export default Subtotal
 