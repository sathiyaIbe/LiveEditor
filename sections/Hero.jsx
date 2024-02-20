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
  
let ms = Date.now();
  const UploadFile=async(e)=>{
    // const files=fileInputRef.current.files
    // console.log(files[0].name)
    // if (files.length>0){
    //   var form= new FormData()
      
    //   for (let i=0;i<files.length;i++){
    //     form.append('files', files[i],files[i].name);
    //   }
  
    const datass=e.toString();
    // console.log(data)   
    // console.log(datas)    
 
    // axios.post("http://localhost:8083/upload", data).then((response) => {
    //   console.log(response);
    // });

    try{
      const response= await fetch("https://photostore-x10i.onrender.com/upload",
      // const response= await fetch("https://photoserver.netlify.app/upload",

      // const response= await fetch("http://localhost:8083/upload",

      {
        method: "POST",
        body: datass
      })
      const data=await response.json();
      if(data.message==="Successfully saved image"){
        alert("Uploaded Successfully ");
        closePopup()
        setIsImgEditorShown(false)
        setToggleText(false)
        setText("")
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

  function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

  const onButtonClick =async () => {
    html2canvas(ref.current).then(function(canvas) {

      var pngUrl = canvas.toDataURL("image/webp");
      UploadFile(pngUrl)
      openPopup()
  });

    // toPng(ref.current)
    //     .then((dataUrl) => {
        
    //       const link = document.createElement('a')
    //       link.href = dataUrl
    //       link.download = `${ms}.png`
    //       openPopup()
    //       // const form_data=new FormData();
    //       // form_data.append("file",dataUrl);
    //       // for (var i of form_data.entries()) {
    //       // console.log(i[0]+"," +i[1])
    //       // }
    //       console.log(dataUrl)
    //       UploadFile(dataUrl)

    //       // const result=base64toBlob(dataUrl, "image/png")
       

    //       // link.click()

    //       // setUploadCheck(true)
    //   })
    //       .catch((err) => {
    //         console.log(err)
    //       })
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
  const capture = React.useCallback(

    () => {
      // const check=async()=>{
      //   const stream = await navigator.mediaDevices.getUserMedia({video: true});

      // }
      // check()
      setImage(webcamRef.current.getScreenshot())
console.log(webcamRef.current.getScreenshot())
      setVideo(true)      
      setIsImgEditorShown(true);
    },
    [webcamRef]
  );


function onChange(e) {
setText(e.target.value)
}



const options = {
  apiKey: "public_kW15bviChvgwuBwR5JHRr4aUBpi1", // This is your API key.
  maxFileCount: 1,
  showFinishButton: true,
  path: {                         // Optional: a string (full file path) or object like so:
    fileName: `${ms}.png`,      // Supports path variables (e.g. {ORIGINAL_FILE_EXT}).
    folderPath: "/uploads/WomensWomen's Day 2024 Photos"        // Please refer to docs for all path variables.
  },
};
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
  <section>
 <div ref={popupOverlayRefMob} class="popup-overlay ">
    <div ref={popupContainerRefMob}  class="popup-container_main w-[90%] flex flex-col justify-center gap-3">

      <div class="popup-card_main flex justify-center   ">
    
      <ScaleLoader className="text-[48px]" color="#F9A603" />

      </div>
      <p className="loadText">Almost there file is uploading...</p>
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

<div className="flex flex-col p-6 p-6">
  <div className='self-center'>
    <div className='flex  justify-end z-[100]  left-0 right-0 absolute w-[94vw] md:w-[90vw]'>
    <div className='flex justify-end   md:w-[50vw] w-[90vw]  py-11'>

  <div className='flex gap-6 pr-3'>
  <button type='button' onClick={()=>onChangeText(false)} className='bg-zinc-950 cursor-pointer bg-opacity rounded-full p-1 w-25 md:p-3 text-white'>

<IoText className='ext-white text-[28px] md:text-[36px] p-1 '  />
</button>
    <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>

    <LuDownloadCloud className='text-white text-[28px] md:text-[36px] p-1  cursor-pointer' onClick={onButtonClick}/>
    
     </div>
     <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>
    <AiOutlineClose className='ext-white text-[28px] md:text-[36px] p-1  cursor-pointer' onClick={closeImgEditor} />
    </div>
    </div>
    </div>
    </div>

<div ref={ref} className='flex flex-col min-h-[83vh]  py-3 justify-center aligns-center'>



 <div className=' text-fix self-center pt-3 flex fex-col justify-center items-center absolute cursor-move z-[100]'>
 <Draggable
    >
      <textarea row="3" className="text-fix text-white max-w-[80vw] min-h-[25vh] bg-transparent">
    {text}
    </textarea>
{/* 
<textarea row="3" id="input"  className="md:max-w-[40vw] max-w-[80vw] min-h-[25vh] resize-y resize-x  track-[1px]  self-center text-center  bg-transparent border  border-none text-white  rounded-lg focus:ring-none focus:border-none block w-full p-2.5 "
 type='text' onChange={onChange} value={text}></textarea> */}
  </Draggable>
 </div>
 

      

<div className="flex flex-col ">
 <img src="frame.png" className='absolute self-center max-w-[95vw] min-h-[87vh] ' alt="frame"/>
 </div>
  <img className="max-w-[95vw] max-h-[87vh] p-1 " src={image} alt={"img"} />
</div>
</div>
</div>
}
</>
}
</>
      :
      <div className="flex flex-col items-center mt-11 md:pt-6 " >
  <button className=" my-6   max-w-[150px] z-10 absolute bottom-[-2%]  px-8 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
        Capture</button>
        <img src="frame.png"  className='absolute min-w-[90vw] min-h-[85vh]' alt="frame"/>
      <Webcam
      audio={false}
      
      ref={webcamRef}
      screenshotFormat="image/webp"
      
    
      className="p-1 min-w-[90vw] min-h-[83vh]"
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
