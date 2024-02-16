/* eslint-disable */
'use client';
import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import {useEffect} from "react";
import Webcam from "react-webcam";
import { LuDownloadCloud } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { IoText } from "react-icons/io5";
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { FaPencil } from "react-icons/fa6";
// const FilerobotImageEditor = dynamic(( 
//   ) => import("react-filerobot-image-editor"), {
//   ssr: false,

// });

// const {TABS,TOOLS} = (() => import("react-filerobot-image-editor"));
// const { TABS, TOOLS } = FilerobotImageEditor;
// const { TABS, TOOLS } = FilerobotImageEditor;
// import  {
//   TABS,
//   TOOLS,
// } from 'react-filerobot-image-editor';

const Hero = () =>
{
  const [video, setVideo] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [text, setText] = React.useState("");
  const [isImgEditorShown, setIsImgEditorShown] = React.useState(false);
  const [toggleText, setToggleText] = React.useState(false);
  const ref = useRef(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'my-image-name.png'
       
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  function functionToFocus() {
    
     document.getElementById('input').focus();
     if(text==="Enter text"){
     setText("");
     }
  }

  // const openImgEditor = () => {
  //   setIsImgEditorShown(true);
  // };.
  if (typeof window !== "undefined") {
    // Client-side-only code
  }

  const closeImgEditor = () => {
  
    setToggleText(false);
    setIsImgEditorShown(false);
   
  };
  const onChangeText = () => {
setToggleText(true);
};
useEffect(() =>{
    
    

   
  },[])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      setImage(webcamRef.current.getScreenshot())

      setVideo(true)      
      setIsImgEditorShown(true);
    },
    [webcamRef]
  );


function onChange(e) {
setText(e.target.value)
}


// function saved(url,name) {
//   const a = document.createElement("a"); //Create <a>
//             a.href = url.imageBase64 //Image Base64 Goes here
//             a.download =url.fullName; //File name Here
//             a.click(); //Downloaded file
//   console.log(url);

// }



return(
  <section>
 
      <div>
      {isImgEditorShown ?
    
<>
{!toggleText&&
<div className="flex flex-col">
<h1 className="Header mb-6 mt-6">Enter The Comments</h1>

<textarea row="3" id="input"  className="md:max-w-[40vw] textArea max-w-[80vw] min-h-[25vh] resize-y resize-x  track-[1px]  self-center text-center  bg-transparent border  border-none text-black  rounded-lg focus:ring-none focus:border-none block w-full p-2.5 "
 type='text' placeholder="Enter The Text" onChange={onChange} value={text}></textarea>
 <button type="button" className="my-6 self-center  max-w-[150px]  px-8 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={onChangeText}>Next</button>
</div>
}
{toggleText&&

        
<div className="flex flex-col ">
  <div className='self-center'>
    <div className='flex  justify-end z-[100]  left-0 right-0 absolute w-[94vw] md:w-[90vw]'>
    <div className='flex justify-end   md:w-[50vw] w-[90vw]  py-11'>

  <div className='flex gap-6 pr-3'>
  {/* <button type='button' onClick={onChangeText} className='bg-zinc-950 cursor-pointer bg-opacity rounded-full p-1 w-25 md:p-3 text-white'>

<IoText className='ext-white text-[28px] md:text-[36px] p-1 '  />
</button> */}
    <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>
    <LuDownloadCloud className='text-white text-[28px] md:text-[36px] p-1  cursor-pointer' onClick={onButtonClick}/>
     </div>
     <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>
    <AiOutlineClose className='ext-white text-[28px] md:text-[36px] p-1  cursor-pointer' onClick={closeImgEditor} />
    </div>
    </div>
    </div>
    </div>

<div ref={ref} className='flex flex-col min-h-[83vh] mx-2 justify-center aligns-center'>



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
 <img src="frame.png" className='absolute self-center min-w-[90vw] min-h-[85vh] ' alt="frame"/>
 </div>
  <img className="min-w-[90vw] min-h-[85vh] p-1 " src={image} alt={"img"} />
</div>
</div>
</div>
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
      screenshotFormat="image/jpeg"
      
    
      className="p-1 min-w-[90vw] max-h-[83vh]"
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
