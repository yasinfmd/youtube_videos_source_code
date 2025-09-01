import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))


import * as rrweb from 'rrweb'
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
let events=[]

let stopFn=null

document.getElementById('recordBtn').addEventListener('click',()=>{
 stopFn= rrweb.record({
  emit(e){
     events.push(e)
    console.log('eventler yakalnnddı',e)
  },
  // blockClass:'asd',
  // checkoutEveryNms:10000,
  // ignoreClass:'def',
  // maskInputOptions:{
  //   password:true
  // },
  // sampling:{
  //     scroll:2000,
  //    mousemove:10000000,
  // },
  // recordCanvas:true
})
})

document.getElementById('stopRecordBtn').addEventListener('click',()=>{
   if(stopFn){
     stopFn()
   }
  new rrwebPlayer({
  target: document.getElementById('replay'),
  props: {
    events,
    autoPlay:true,
    liveMode:false
  },
});
})