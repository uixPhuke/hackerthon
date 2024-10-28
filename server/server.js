const express=require('express')
const app=express()
require('dotenv').config()
const connectDB=require('./db')

connectDB()

app.get('/',(req,res)=>{
res.json({message:"This is Samrtcity server"})
})

const PORT=process.env.PORT 

app.listen(PORT,()=>{
    console.log(`server is runing at PORT ${PORT}`)
})

