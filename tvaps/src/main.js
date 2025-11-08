import Hls from "hls.js";
import channels from './channels.json'

const listContainer=document.getElementById('channel-list')
const title=document.getElementById('channel-title')
const video=document.getElementById('player')

const playChannel=(url)=>{
  if(Hls.isSupported()){
    const hls=new Hls()
    hls.loadSource(url)
    hls.attachMedia(video,url)
  }else{
    alert('Hata')
  }
}
channels.forEach((ch,i)=>{
const div=document.createElement('div')
div.innerHTML=`<img src="${ch.logo}" /> <span>${ch.name}</span>`
div.onclick=()=>{
  title.textContent=ch.name
  playChannel(ch.url)
}
listContainer.appendChild(div)

})
