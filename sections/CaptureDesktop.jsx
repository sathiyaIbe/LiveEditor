/* eslint-disable */
'use client';
import React, { useCallback, useRef } from 'react';
import {toPng, toBlob,toCanvas,toPixelData } from 'html-to-image';
import {useEffect} from "react";
import Webcam from "react-webcam";
import { LuDownloadCloud } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { IoText } from "react-icons/io5";
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { FaPencil } from "react-icons/fa6";
import Uploady from "@rpldy/uploady";
import { UploadButton } from "@bytescale/upload-widget-react";
import * as Bytescale from "@bytescale/sdk";
import { FormEvent } from 'react'
import {ScaleLoader} from "react-spinners";
import html2canvas from 'html2canvas';
const Hero = () =>
{
  const [video, setVideo] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [text, setText] = React.useState("");
  const [isImgEditorShown, setIsImgEditorShown] = React.useState(false);
  const [toggleText, setToggleText] = React.useState(false);
  const ref = useRef(null);;
  const [uploadCheck,setUploadCheck] = React.useState(false)
  const [checkLoading,setCheckLoading] = React.useState(true)

  const camera = useRef(null);
  let popupOverlayRef=useRef(null)
  let popupContainerRef=useRef(null)
  let popupOverlayRefMob=useRef(null)
  let popupContainerRefMob=useRef(null)
  
let ms = Date.now();
  const UploadFile=async(e)=>{
    const datass=e.toString();

    try{
      const response= await fetch("https://photostore-x10i.onrender.com/upload",
      {
        method: "POST",
        body: datass
      })
      const data=await response.json();
      if(data.message==="Successfully saved image"){
        // alert("Uploaded Successfully ");
        // closePopup()
        setCheckLoading(false);
        // setIsImgEditorShown(false)
        // setToggleText(false)
        // setText("")

      }else{
        alert("Upload Failed Try Again");
      }
    }catch(e){
    console.error(e)
    }
  }

  function openPopup() {
    popupOverlayRefMob.current.style.display = "flex";
  
    setTimeout(() => {
      popupContainerRefMob.current.style.opacity = "1";
      popupContainerRefMob.current.style.transform = "scale(1)";
    }, 0.1);
  }
  function closePopup() {
    popupContainerRefMob.current.style.opacity = "0";
    popupContainerRefMob.current.style.transform = "scale(0.8)";
  
    setTimeout(() => {
      popupOverlayRefMob.current.style.display = "none";
    }, 1000);
  }



  const onButtonClick =async () => {
    html2canvas(ref.current).then(function(canvas) {

      var pngUrl = canvas.toDataURL("image/webp");
      UploadFile(pngUrl)
      openPopup()
  });

  }
  const closeImgEditor = () => {
  setText('')
    setToggleText(false);
    setIsImgEditorShown(false);
   
  };
  const onChangeText = (e) => {
setToggleText(e);
};

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
      setImage(webcamRef.current.getScreenshot())
      setVideo(true)      
      setIsImgEditorShown(true);
    },
    [webcamRef]
  );


function onChange(e) {
setText(e.target.value)
}

function controlFinish(file){
  if(file){
  alert("Uploaded Successfully");
 setIsImgEditorShown(false)
 setToggleText(false)
 setText("")
 setUploadCheck(false)
  }
}
// useEffect(()=>{
// openPopup()
// },[])

return(
  <section className="md:max-w-[100vw] md:overflow-x-hidden">
 <div ref={popupOverlayRefMob} class="popup-overlay ">
    <div ref={popupContainerRefMob}  class="popup-container_main w-[90%] flex flex-col justify-center  gap-3">
      {checkLoading?
<div className="bg-white  py-11 w-[70%] self-center rounded-lg">
      <div class=" flex justify-center mb-6">
    
      <ScaleLoader className="text-[48px]" color="#F9A603" />

      </div>
      <p className="loadText ">Almost there file is uploading...</p>
      </div>:
      <div className="bg-white  flex flex-col py-11 w-[70%] p-3 self-center rounded-lg">
        <img className="w-[50px] self-center mb-3" src="/check.png" alt="success-icon" />
            <p className="loadText w-[100%] self-center ">Thank You! For participating. Your Photo has been uploaded to our secure database</p>

      </div>
}
    </div>

  </div>
      <div>
      {isImgEditorShown ?
    
<>
{!toggleText&&
<div className="flex flex-col textEditodBg">
 <textarea row="3" id="input"  className="md:max-w-[40vw] mt-24 textArea max-w-[80vw] min-h-[25vh] resize-y resize-x  track-[1px] placeholder-black  self-center text-center  bg-transparent border border-[3px]  border-gray-300 text-black  rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
 type='text' placeholder="Please add your message..." onChange={onChange} value={text}></textarea>
 <button type="button" className="my-6 self-center  max-w-[150px]  px-8 py-3 text-[22px] font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={()=>onChangeText(true)}>Next</button> 

</div>
}
{toggleText&&
        <>
        {uploadCheck?
        <div className="flex flex-col textEditodBg"> 
        <h1 className="Header mb-6 mt-6">Upload the file</h1>
       <UploadButton options={options}
                onComplete={(file) =>controlFinish(file)}>
    {({onClick}) =>
      <button className="my-6 self-center   max-w-[190px]   px-8 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={onClick}>
        Upload Here
      </button>
    }
  </UploadButton>
        </div>:

<div className="flex flex-col justify-center min-h-screen win-w-[100vw] ">
  <div className=' self-center md:overflow-hidden'>
    <div className='flex  justify-end z-[100]  left-0 right-0 absolute top-[15%] w-[94vw] md:w-[80vw]'>
    <div className='flex justify-end    w-[90vw]  '>

  <div className='flex gap-6 pr-3'>
  <button type='button' onClick={()=>onChangeText(false)} className='bg-zinc-950 cursor-pointer bg-opacity rounded-full p-1 w-25 md:p-3 text-white'>

<IoText className='ext-white text-[36px] md:text-[46px] p-1 '  />
</button>
    <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>

    <LuDownloadCloud className='text-white text-[36px] md:text-[42px] p-1  cursor-pointer' onClick={onButtonClick}/>
    
     </div>
     <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>
    <AiOutlineClose className='ext-white text-[36px] md:text-[42px] p-1  cursor-pointer' onClick={closeImgEditor} />
    </div>
    </div>
    </div>
    </div>
    <div className=' flex flex-col  '>

<div ref={ref} className='flex flex-col rounded-2xl '>

 
 

      

{/* <div className="flex flex-col ">
 <img src="frame.png" className='absolute self-center max-w-[95vw] min-h-[87vh] md:hidden' alt="frame"/>
 <img src="frame_desktop.png"  className='absolute max-w-[80vw] max-h-[90vh] md:block hidden' alt="frame-desktop"/>

 </div>
  <img className="max-w-[95vw] md:max-w-[75vw] md:min-h-[65vh] max-h-[87vh] p-1 md:p-0" src={image} alt={"img"} />
</div> */}
<div  className="div_block ">
<div className=' text-fix self-center min-w-[100vw] md:pt-0 pt-3 flex fex-col justify-center items-center absolute cursor-move z-[100]'>
 <Draggable >
      <p  className="text-fix  self-center text-white md:max-w-[40vw] items-center  max-w-[80vw] outline-none min-h-[25vh] md:min-h-[30vh] bg-transparent ">
    {text}
    </p>
{/* 
<textarea row="3" id="input"  className="md:max-w-[40vw] max-w-[80vw] min-h-[25vh] resize-y resize-x  track-[1px]  self-center text-center  bg-transparent border  border-none text-white  rounded-lg focus:ring-none focus:border-none block w-full p-2.5 "
 type='text' onChange={onChange} value={text}></textarea> */}
  </Draggable>
 </div>
 <img src="frame_desktop.png"  className='new_frame' alt="frame-desktop"/>

 
  <img className="new_camera" src={image} alt={"img"} />
  </div>
</div>
</div>
</div>
</div>
}
</>
}
</>
      :
  //     <div className="flex flex-col items-center mt-11   " >
  // <button className=" my-6   max-w-[150px] z-10 absolute bottom-[3%]  px-3 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
  //       Capture</button>
  //       {/* <img src="frame.png"  className='absolute min-w-[90vw] min-h-[85vh] md:hidden' alt="frame"/> */}
  //       <img src="frame_desktop.png"  className='absolute w-[70vw] h-[78vh] rounded-lg md:block hidden' alt="frame-desktop"/>
     
  //    <Webcam
  //     audio={false}
      
  //     ref={webcamRef}
  //     screenshotFormat="image/webp"
      
    
  //     className=" hidden md:block w-[70vw] rounded-lg h-[90vh] p-1 "
  //     videoConstraints={videoConstraints} />
  //     {/* <button className=" my-6   max-w-[150px] z-10 bottom-[15%] absolute left-0 right-0   px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
  //       Capture</button>
  //        */}
        
  //   </div>



  <div className="div_block pt-6 " >
  <button className=" my-6 self-center  max-w-[150px] z-10 absolute bottom-[2%] px-3 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
        Capture</button>
        {/* <img src="frame.png"  className='absolute min-w-[90vw] min-h-[85vh] md:hidden' alt="frame"/> */}
        <img src="frame_desktop.png"  className='new_frame' alt="frame-desktop"/>
     
     <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/webp"
      className=" hidden md:block new_camera "
      videoConstraints={videoConstraints} />
      {/* <button className=" my-6   max-w-[150px] z-10 bottom-[15%] absolute left-0 right-0   px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
        Capture</button>
         */}
        
    </div>
      
      }
    </div>
 
    {/* <div id="draggable" class="no-select ">{text}</div> */}

    
    

  </section>
)
}
export default Hero;
