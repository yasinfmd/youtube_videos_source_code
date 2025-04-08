import {useEffect,useRef,useState} from 'react'
import * as fabric from 'fabric'
function App() {  
  const [canvas,setCanvas]=useState(null)
  useEffect(()=>{
    const canvas=new fabric.Canvas('editor-canvas',{
      width:360,
      height:640,
      backgroundColor:'#fff'
    })
    setCanvas(canvas)

    return ()=>{
      canvas.dispose()
    }
  },[])

  const handleImageUplaod=(e)=>{
    const file=e.target.files[0]
    if(!file || !canvas) return
    const reader=new FileReader()
    reader.onload=(event)=>{
      const imgObj=new Image()
      imgObj.src=event.target.result
      imgObj.onload=()=>{
        const image=new fabric.Image(imgObj)
        const scale=Math.min((canvas.width-50)/image.width,(canvas.height-50)/image.height)
        image.set({
          scaleX:scale,
          scaleY:scale,
          left:canvas.width/2,
          top:canvas.height/2,
          originX:'center',
          originY:'center',
        })
        canvas.add(image)
        canvas.setActiveObject(image)
        canvas.renderAll()
      }
    }

    reader.readAsDataURL(file)

  }



  const addText=()=>{

    if(!canvas) return

    const text=new fabric.IText('Text kutusu',{
      left:canvas.width/2,
      top:canvas.height/2,
      originX:'center',
      originY:'center',
      fontSize:30,
      fontWeight:600,
      fill:'#000000'
    })
    canvas.add(text)
    canvas.setActiveObject(text)
    canvas.renderAll()
  }

  const saveCanvas=()=>{
    if(!canvas) return
    const dataUrl=canvas.toDataURL({
      format:'png',
      quality:1
    })
    const link=document.createElement('a')
    link.href=dataUrl
    link.download='canva-story-maker.png'
    link.click()
  }
  return (
    <>
    <div className='editor-wrapper'>
      <div className='canvas-container'>
        <canvas id='editor-canvas' />
      </div>
      <div className='toolbar'>
        <input type='file' id='imgUpload' accept='image/*' onChange={handleImageUplaod}
        style={{display:'none'}}
        />
        <label htmlFor='imgUpload' className='button'>Resim ekle</label>

        <button onClick={addText}>Yazı ekle</button>
        <button onClick={saveCanvas}>Kaydet</button>
      </div>
    </div>
    </>
  )
}

export default App
