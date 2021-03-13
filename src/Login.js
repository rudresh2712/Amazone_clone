import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './Login.css'
import {auth} from "./firebase"


const url="http://active8studios.co.uk/wp-content/uploads/Amazon-Logo-schwarz.jpg"

function Login() {

    const history =useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // have an empty string and not null

    const signIn = e =>{
        e.preventDefault();
        // this prevent refreshing

        auth.signInWithEmailAndPassword(email,password)
            .then((auth)=>{
                console.log(auth);
                history.push('/')
            })
            .catch(error=>alert(error.message))
    }

    const register = e =>{
        e.preventDefault();
        // this prevent refreshing

        auth.createUserWithEmailAndPassword(email,password)
            .then((auth)=>{
                console.log(auth);
                history.push('/')
            })
            .catch(error=>alert(error.message))
    }



    return (
        <div className="login">
        <Link to="/">
        <img 
          className="login__logo"
          src= {url} />
        </Link>

        <div className="login__container">
            <h1> Sign-in</h1>
            <form>
                <h5> E-mail</h5>
                <input type='text' value={email} onChange=
                {e=> setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} onChange=
                {e=> setPassword(e.target.value)}/>

                <button type='submit' onClick={signIn}
                className="login__signInButton">Sign In</button>
            </form>
            <p>
            By signing in you will be subjected to discreationary powers<br/>
            of those haunted by the curse of intelligence and stringled by their<br/>
            destiny resulting in an eternal dispute.
            </p>

            <button onClick={register}
             className="login__registerButton"> Create your account</button>
        </div>
        </div>
    )
}

export default Login
 