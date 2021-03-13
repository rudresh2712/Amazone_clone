import Header from './Header.js'
import './App.css';
import React ,{useEffect} from 'react'
import Home from './Home.js'
import Checkout from './Checkout'
import Payment from './Payment.js'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Login from "./Login.js";
import {auth} from "./firebase"
import {useStateValue} from "./StateProvider"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import Orders from "./Orders.js"

const promise = loadStripe('pk_test_51ITCFxGoDKVekleOzRwWT9XM6FlrBsnZi0bEFv8a3aELUxAnktQ0adi0FKSaDOecb0iiV0Qf3i5l5rdbAxIMH9Y3000KDN3AtH');

function App() {
    const [{},dispatch]=useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged(authUser =>{
      // console.log("the user is>>>",authUser);

      if(authUser){
            dispatch({
              type: 'SET_USER',
              user: authUser
            })
      }
      else{
        // if the user logged out
            dispatch({
              type: 'SET_USER',
              user: null
            })
      }

    })
  }, [])
// A listener who sees who is logged in

  return (
    <Router>
    <Switch>
    <div className="App">

        <Route path="/orders">
          <Header/>
          <Orders />
        </Route>
        
        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/checkout">
          <Header/>
          <Checkout/>
        </Route>
        
        <Route path="/payment">
          <Header/>
          <Elements stripe={promise}> 
          <Payment/>
          </Elements>
        </Route>

        <Route exact path="/"  >
        <Header/>
        <Home/>
        </Route>

    </div>
    </Switch>
    </Router>
  );
}

export default App; 

// ***Always write switch and Router next to next,
//  just writing  div in between of them causes no result 

// Done till 2:26:13
// done till 3:06:13
// Done till 3:51:27 Login funtionality onwards.
// Done till 5:07:50 
// You have to do the hover effects on your own

// Blaze Plan fro firebase.
// 6:04:24

// 11th march 7:10:13

// 12th March 7:58:52 starts the css styling of order.css


// ***********Procedure:
// 1) check the code
// 2) do the console.log
// 3) check for dependencies
// 4) youtube the function causing error
// 5) check in documentation
// 6) check the onject passing attributes(point 2)
// 7) check whether file imported or not, OR terminal working