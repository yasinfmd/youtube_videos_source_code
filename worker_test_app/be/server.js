import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app=express()
app.use(cors({
    origin:'*'
}))
const server=http.createServer(app)



const io=new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST'],
    }
})




io.on('connection',(socket)=>{
    console.log('client connected',socket.id)
    const intervalId=setInterval(()=>{
        const data=Array.from({length:10}).map((_,i)=>({
            id:i,
            value:Math.random()
        }))
        console.log('data',
            data
        )


        socket.emit('data',data)
    },400)

    socket.on('disconnect',()=>{
        console.log('socket lost',socket.id)

        clearInterval(intervalId)
    })
})



server.listen(3000,()=>{
    console.log('running on port 3000')
})