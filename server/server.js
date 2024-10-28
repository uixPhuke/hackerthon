const express=require('express')
const app=express()
const cookieParser = require("cookie-parser");
const userRouter = require("./router/userRouter");
const serviceProviderRouter = require("./router/serviceProviderRouter");
const reviewRouter=require('./router/reviewRouter')
const bookingRouter=require('./router/bookingRouter')
require('dotenv').config()
const connectDB=require('./db')
const cors = require('cors')


app.use(
  cors({
    origin:  "http://localhost:5173",

    credentials: true,
  })
);



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
app.use("/booking", bookingRouter);


//PORT
const PORT=process.env.PORT 

app.listen(PORT,()=>{
    console.log(`server is runing at PORT ${PORT}`)
})

