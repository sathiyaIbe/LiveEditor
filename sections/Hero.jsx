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
import axios from "axios";
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
  const camera = useRef(null);
  let popupOverlayRef=useRef(null)
  let popupContainerRef=useRef(null)
  let popupOverlayRefMob=useRef(null)
  let popupContainerRefMob=useRef(null)
  let popupOverlayRefMob1=useRef(null)
  let popupContainerRefMob1=useRef(null)
  
  const [checkLoading,setCheckLoading] = React.useState(true)
  
let ms = Date.now();
  const UploadFile=async(e)=>{
    const datass=e.toString()
    try{
      const response= await fetch("https://photostore-x10i.onrender.com/upload",
      {
        method: "POST",
        body: datass
      })
      const data=await response.json();
      if(data.message==="Successfully saved image"){
        setCheckLoading(false);
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
  const capture = React.useCallback( () => {
      setImage(webcamRef.current.getScreenshot())
      setVideo(true)      
      setIsImgEditorShown(true);
    },
    [webcamRef]
  );


function onChange(e) {
setText(e.target.value)
}

return(
  <section className="md:hidden">
 <div ref={popupOverlayRefMob} class="popup-overlay ">
    <div ref={popupContainerRefMob}  class="popup-container_main w-[90%] flex flex-col justify-center gap-3">
    {checkLoading?
<div className="bg-white  py-11 w-[70%] self-center rounded-lg">
      <div class=" flex justify-center mb-6">
    
      <ScaleLoader className="text-[48px]" color="#F9A603" />

      </div>
      <p className="loadText ">Your photo is uploading…</p>
      </div>:
      <div className="bg-white  flex flex-col py-11 w-[70%] p-3 self-center rounded-lg">
        <img className="w-[50px] self-center mb-3" src="/check.png" alt="success-icon" />
            <p className="loadText w-[100%] self-center ">Thank you for participating! Your details have been successfully uploaded onto our secure database</p>

      </div>
}
</div>
  </div>
      <div>
      {isImgEditorShown ?
    
<div className="overflow-hidden max-w-[100vw] max-h-[100vh] overflow-y-hidden overflow-x-hidden">
<div className="flex  overflow_check min-h-screen w-full absolute   z-[100]">
<div className="flex flex-col textEditodBg">
 <textarea row="3" id="input"  className="md:max-w-[40vw] mt-24 textArea max-w-[80vw] min-h-[25vh] resize-y resize-x  track-[1px] placeholder-black  self-center text-center  bg-transparent border border-[3px]  border-gray-300 text-black  rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
 type='text' placeholder="Please type your name and International Women’s Day message here (Maximum 120 characters)" onChange={onChange} value={text}></textarea>
 <button type="button" className="my-6 self-center  max-w-[150px]  px-8 py-3 text-[22px] font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" 
 onClick={onButtonClick}>Submit</button> 
</div>
</div>
{/* START of REF */}
<div className="flex flex-col  p-6 p-6 absolute ">
  <div className='self-center'>
<div ref={ref} className='flex flex-col rounded-xl'>
 <div className=' text-fix self-center  w-[90vw] flex fex-col justify-center items-center absolute cursor-move z-[99]'>
      <h1  className=" text-center padding_text text-black self-center max-w-[60vw] min-h-[auto] bg-transparent">
      {text}
    </h1>
 </div>

 <div  className="div_block_mob self-center">

<img src="frame_1.png"  className='new_frame_mob' alt="frame-desktop"/>


 <img className="new_camera_mob" src={image} alt={"img"} />
 </div>
</div>
</div>
</div>

{/* END of REF */}
</div>
      :
      <div className="flex flex-col items-center mt-11 md:pt-6 " >
  <button className=" my-6   max-w-[150px] z-10 absolute bottom-[-2%]  px-8 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
        Capture</button>
        <img src="frame_1.png"  className='absolute min-w-[90vw] min-h-[85vh]' alt="frame"/>
      <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/webp"
      
    
      className="p-1 min-w-[90vw] min-h-[83vh]"
      videoConstraints={videoConstraints} /> 
    </div>
      
      }
    </div>
 
    {/* <div id="draggable" class="no-select ">{text}</div> */}

    
    

  </section>
)
}
export default Hero;
