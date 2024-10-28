const express=require('express')
const app=express()
const cookieParser = require("cookie-parser");
const userRouter = require("./router/userRouter");
const serviceProviderRouter = require("./router/serviceProviderRouter");
const reviewRouter=require('./router/reviewRouter')
require('dotenv').config()
const connectDB=require('./db')

//connect to database
connectDB()

//server 
app.get('/',(req,res)=>{
res.json({message:"This is Samrtcity server"})
})

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use user routes
app.use("/user", userRouter);
app.use("/provider", serviceProviderRouter);
app.use("/reviews", reviewRouter);


//PORT
const PORT=process.env.PORT 

app.listen(PORT,()=>{
    console.log(`server is runing at PORT ${PORT}`)
})

