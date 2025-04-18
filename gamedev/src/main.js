import './style.css'
import pikacu from './char.png'
const canvas=document.getElementById('game')
const ctx=canvas.getContext('2d')
const startBtn=document.getElementById('startBtn')

const jumpSound=new Audio('https://cdn.pixabay.com/audio/2024/08/30/audio_11f0bd7eb7.mp3')
jumpSound.volume=0.05
const failSound=new Audio('https://cdn.pixabay.com/audio/2025/02/27/audio_ccf724dc45.mp3')

const gravity=0.14
const jumpVelocity=-6.5
const maxPlatformGap=60


const player={
  x:250,y:400,
  width:30,
  height:30,
  velocityY:0
}

let platforms=[]
let lastY=500
let gameOver=false
let animationFrameId=null


function resetGame(){
  platforms=[]
  lastY=500
  player.velocityY=0
  player.x=250
  player.y=400
  gameOver=false
}

function generatePlatforms(){
  while (lastY>-500) {
      const y=lastY- (Math.random()*20+40)
      const x=Math.random()*440
      platforms.push({x,y,width:60,height:10})
      lastY=y
  }
}

function initPlayer(){
  player.x=platforms[platforms.length-1].x+15
  player.y=platforms[platforms.length-1].y-player.height
  player.velocityY=0
}

let keys={left:false,right:false}

document.addEventListener('keydown',(e)=>{
  if(e.key==='ArrowLeft') keys.left=true
  if(e.key==='ArrowRight') keys.right=true
})


document.addEventListener('keyup',(e)=>{
  if(e.key==='ArrowLeft') keys.left=false
  if(e.key==='ArrowRight') keys.right=false
})

const playerImage=new Image()
playerImage.src=pikacu


function drawPlayer(){
  ctx.drawImage(playerImage,player.x,player.y,player.width,player.height)
}

function drawPlatform(){
  ctx.fillStyle='#a0d911'
  platforms.forEach((p)=>{
    ctx.fillRect(p.x,p.y,p.width,p.height)
  })
}

function stopAllSounds(){
  jumpSound.pause()
  jumpSound.currentTime=0
  failSound.pause()
  failSound.currentTime=0
}

function update(){
  player.velocityY+=gravity
  player.y +=player.velocityY

  if(keys.left) player.x -=5
  if(keys.right) player.x +=5

  if(player.x<0) player.x=500-player.width
  if(player.x+player.width > 500) player.x=0

  if(player.velocityY>0){
    platforms.forEach((p)=>{
      if(
        player.x+player.width > p.x -5 &&
        player.x<p.x+p.width+5 &&
        player.y + player.height>p.y &&
        player.y+player.height<p.y+p.height+5
      ){
        player.velocityY=jumpVelocity
        jumpSound.currentTime=0
        jumpSound.play()
      }
    })
  }

  if(player.y<200){
    player.y=200
    platforms.forEach((p)=>{
      p.y +=Math.abs(player.velocityY)
      if(p.y>500){
        const highestY=Math.min(...platforms.map((p)=>p.y))
        const newY=highestY - (Math.random()*(maxPlatformGap-60)+60)
        const newX=Math.random()*440
        if(newY<0) return
        platforms.push({x:newX,y:newY,width:60,height:10})

      }
    })
  }

  if(player.y>500 && !gameOver){
    gameOver=true
    stopAllSounds()
    failSound.play()
    cancelAnimationFrame(animationFrameId)
    startBtn.textContent='Yeniden başla'
  }


}

function gameLoop(){
  ctx.clearRect(0,0,500,500)
  update()
  drawPlatform()
  drawPlayer()
  if(!gameOver) animationFrameId=requestAnimationFrame(gameLoop)
}

function startGame(){
  resetGame()
  startBtn.textContent='Baştan başla'
  generatePlatforms()
  initPlayer()
  gameLoop()
}


startBtn.addEventListener('click',startGame)