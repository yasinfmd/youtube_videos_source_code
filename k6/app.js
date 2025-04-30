const express=require('express')
const app=express()


app.get('/api/v1/test',(req,res)=>{
    res.status(200).json({data:1})
})


app.listen(5020,()=>{
    console.log('app rınning on 5020')
})