import React, { use, useState } from "react"
import useEvent from "./useEvent"
const World=()=>{
    const [info,setInfo]=useState('')
    const {dispatch}= useEvent("myEvent",(data)=>{
        console.log('data',data)
        setInfo(JSON.stringify(data))
    })
    return(
        <div>
            <p>This is world</p>
            <h1>{info}</h1>
            <button onClick={()=>{
                dispatch("myEvent")
            }}>Press Word</button>
        </div>
    )
}
export default World