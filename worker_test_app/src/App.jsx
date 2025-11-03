import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'
import { useTasksStore } from './store';
export default function App() {
  const [mode,setMode]=useState('main')
  const [isConnected,setIsConnected]=useState(false)
  const [workerReady,setWorkerReady]=useState(false)
  const [avgTime,setAvgTime]=useState(0)
  const [batchCout,setBatchCount]=useState(0)
  const {tasks,addTask,clearTasks}=useTasksStore()

  const socketRef=useRef(null)
  const workerRef=useRef(null)
  const timesRef=useRef([])


  const updateMetrics=(time)=>{
        timesRef.current.push(time)
        if(timesRef.current.length>100) timesRef.current.shift()
        const avg=timesRef.current.reduce((a,b)=>a+b,0)/timesRef.current.length
        setAvgTime(avg)
        setBatchCount((prev)=>prev+1)

  }

  const processMain=(payload)=>{
    const start=performance.now()
    const result=payload.map((item)=>{
      let sum=0
      for (let index = 0; index < 1000; index++) {
        sum+=Math.sqrt(item.value*index)*100/5 + 50
      }
      return {
        id:`${Date.now()}-${item.id}-${Math.random().toString(36)}`,
        value:Math.floor(item.value*100),
        computed:sum*0.0025
      }
    })
      updateMetrics(performance.now()-start)
    return result
  }

  useEffect(()=>{
    if(batchCout===50){
      console.log('avgTime',avgTime.toFixed(2) + "ms")
    }
  },[batchCout])

  useEffect(()=>{
    workerRef.current=new Worker(new URL('./worker.js',import.meta.url))
    workerRef.current.onmessage=(e)=>{
        if(e.data.type==='ready'){
          setWorkerReady(true)
          return
        }
        updateMetrics(e.data.time)
        addTask(e.data.result)
    }

    return ()=>workerRef.current?.terminate()
  },[addTask])
  useEffect(()=>{
    socketRef.current=io('http://localhost:3000')
    socketRef.current.on('connect',()=>setIsConnected(true))
    socketRef.current.on('disconnect',()=>setIsConnected(false))


    socketRef.current.on('data',(payload)=>{
      if(mode==='main'){
          addTask(processMain(payload))
      }else if(mode==='worker'){
          // TODO
          workerRef.current.postMessage({payload})
      }
    })
    return ()=>socketRef.current?.disconnect()
  },[mode,addTask,workerReady])

  const switchMode=(newMode)=>{
    clearTasks()

    timesRef.current=[]
    setAvgTime(0)
    setBatchCount(0)
    setMode(newMode)
  }
  return (
    <div className='flex flex-col gap-8 p-8'>
      <h1>Current Mode  {mode} </h1>

      <div className='flex items-center gap-4'>
           <button onClick={()=>{
        switchMode('main')
      }}>Main Thread</button>
      <button onClick={()=>{
        switchMode('worker')
      }}>Worker Thread</button>
      </div>
     <h1>Avg Time {avgTime.toFixed(2)} ms</h1>
      <h1>Toplam Batch: {batchCout} adet</h1>
      <h1>Socket Status : {isConnected ? 'Bağlandı':'Bağlanamadı'}</h1>

      <div className='border-2 border-red-500 p-4 bg-red-50'>
        <div className='flex  gap-1 items-end h-80 overflow-x-auto'>
          {
            tasks.length===0?<p>Veri bekleniyor...</p>
            :tasks.map((item)=>{
              return(
                <div key={item.id} 
                className='w-4 bg-green-50 border border-green-500'
                style={{height:`${item.value}px`}}>

                  </div>
              )
            })
          }
        </div>
      </div> 
    </div>
  );
}