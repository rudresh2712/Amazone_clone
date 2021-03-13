const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const stripe=require("stripe")
(`sk_test_51ITCFxGoDKVekleOlGcsiT0PTtzv8FAZcLohy3HIPxstfuiTveyhuOwvaPJ119ucsivUV3KOiBmiILoHDQM9Rcyd00QCyA2m9a`)

//API

//App config 
const app=express();

//Middlewares
app.use(cors({origin:true}));
app.use(express.json());

//API routes
app.get('/',(request,response)=> response.status(200).send('hello world'))

app.post('/payments/create',async(request,response)=>{
    const total = request.query.total;

    console.log('Payment Request amount>>>',total)

    const paymentIntent= await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


//Listen command
exports.api = functions.https.onRequest(app)
// the api
// localhost:5001/challenge-10e76/us-central1/api