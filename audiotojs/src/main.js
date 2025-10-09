import './style.css';

let audioContext;
let analyser;
let audoLevel=0

let isListening = false;

const meteorContainer = document.getElementById('meteor-container');
const startBtn = document.getElementById('start-btn');
const levelDisplay = document.getElementById('level');


const colors=['#FF0000','#00FF00','#0000FF']



const startMicrophone = async () => {

  try {
  if (isListening) return;
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    alert("Tarayıcınız mikrofon erişimini desteklemiyor.")
    return
  }
  
  const stream = await navigator.mediaDevices.getUserMedia({ audio: {
    echoCancellation: true, 
    noiseSuppression: true
  }});

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  isListening = true;
  startBtn.disabled = true;
  startBtn.textContent = 'Dinleniyor...';


  startAudioAnlysis()
  startGenerateMeteor()
  } catch (error) {
    console.log('Mikrofon erişimi reddedildi veya bir hata oluştu:', error);
    alert("Mikrofon erişimi reddedildi veya bir hata oluştu.")
  }
}




const startAudioAnlysis = () => {
  
  function analyze() {
    if (!isListening) return;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    audoLevel=average
    levelDisplay.textContent = `${Math.round(average)}%`;
    requestAnimationFrame(analyze);
  }
  analyze();
}


const startGenerateMeteor=()=>{
  setInterval(() => {
    if(!isListening) return
    if(audoLevel<10) return
    const random=2+(audoLevel*10)

    createMeteor()
 
  }, 20);

}


const createMeteor=()=>{
  const meteor=document.createElement('div')
  meteor.classList.add('meteor')
  const color=colors[Math.floor(Math.random()*colors.length)]
  meteor.style.background=color

  const startX=Math.random()*window.innerWidth
  const startY=-20

  const horizontalSpeed=(Math.random()-0.5)*10
  const verticalSpeed=2+(audoLevel/20)+(Math.random()*10)

  meteor.style.left=`${startX}px`
  meteor.style.top=`${startY}px`

  meteorContainer.appendChild(meteor)

  let posX=startX
  let posY=startY
  const interval=setInterval(() => {
    posX+=horizontalSpeed
    posY+=verticalSpeed
    meteor.style.left=`${posX}px`
    meteor.style.top=`${posY}px`

    if(posY>window.innerHeight || posX< -50 || posX>window.innerWidth+50){
      clearInterval(interval)
      meteor.remove()
    }
  }, 20);   
}
startBtn.addEventListener('click', startMicrophone)