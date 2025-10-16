import './style.css'

const box1=document.getElementById('box1')
const box2=document.getElementById('box2')


let pos1=0
let pos2=0


setInterval(()=>{
  pos1+=2
  if(pos1>window.innerWidth-150){
    pos1=0
  }
  box1.style.left=pos1+"px"
},16)

function animate(){
  pos2+=2
    if(pos2>window.innerWidth-150){
    pos2=0
  }
  box2.style.left=pos2+"px"
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)