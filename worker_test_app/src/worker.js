self.onmessage=function(e){
const {payload}=e.data
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
    const time=this.performance.now()-start
     self.postMessage({result,time})
}

self.postMessage({type:'ready'})