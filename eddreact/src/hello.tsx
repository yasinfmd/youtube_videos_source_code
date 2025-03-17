import React from "react"
import World from "./world"
import useEvent from "./useEvent"

const Hello=()=>{
    const {dispatch}=useEvent("myEvent",null)
    const handleClick=()=>{
        dispatch("Hello içerisindeki buton tıklandı")
    }
    return(
        <div>
            <p>This is hello</p>
            <button onClick={handleClick}>Press</button>

            <World />
        </div>
    )
}
export default Hello