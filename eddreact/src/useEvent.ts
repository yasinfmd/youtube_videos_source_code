import {useCallback,useEffect} from 'react'

const useEvent=(eventName,callback)=>{

    useEffect(()=>{
        if(!callback)return
        const listener=(event)=>{
                callback(event.detail)
        }
        window.addEventListener(eventName,listener)

        return ()=>{
            window.removeEventListener(eventName,listener)
        }
    },[eventName,callback])


    const dispatch=useCallback((detail)=>{
        const event=new CustomEvent(eventName,{detail})
        window.dispatchEvent(event)
    },[eventName])

    return {dispatch}

}
export default useEvent