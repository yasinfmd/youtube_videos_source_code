import './style.css'
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()*&^%";
const fontSize=16
const lettersArray=letters.split("");
const columns=Math.floor(canvas.width/fontSize);
const drops=Array(columns).fill(1);


  console.log(drops)

function draw(){
  ctx.fillStyle="rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#0F0";
  ctx.font=fontSize+"px arial";

  for(let i=0;i<drops.length;i++){
    const text=lettersArray[Math.floor(Math.random()*lettersArray.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height && Math.random()>0.975){
      drops[i]=0;
    }
    drops[i]++;
  }
 requestAnimationFrame(draw);
}


draw()