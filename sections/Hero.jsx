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
  const [text, setText] = React.useState("Enter text");
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

  // const openImgEditor = () => {
  //   setIsImgEditorShown(true);
  // };.
  if (typeof window !== "undefined") {
    // Client-side-only code
  }

  const closeImgEditor = () => {
    setText("Enter Text");
    setToggleText(false);
    setIsImgEditorShown(false);
   
  };
  const onChangeText = () => {
setText("Enter the text");
setToggleText(!toggleText);
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
      {/* <button onClick={openImgEditor}>Open Filerobot image editor</button> */}
      {isImgEditorShown ? (
//         <div className="h-[700px] w-[500px]  md:w-[1300px] md:h-[700px]">
//         <FilerobotImageEditor
//         className="filerobot-editor"
       
//           source={image}
//           onSave={(editedImageObject, designState) =>
//             saved(editedImageObject,designState)

//           }
//           onClose={closeImgEditor}
//           annotationsCommon={{
//             fill: '#000',
//           }}
//           Text={{ text: 'Enter Text' }}
//           Rotate={{ angle: 90, componentType: 'slider' }}
//           Crop={{
//             presetsItems: [
//               {
//                 titleKey: 'classicTv',
//                 descriptionKey: '4:3',
//                 ratio: 4 / 3,
//                 // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
//               },
//               {
//                 titleKey: 'cinemascope',
//                 descriptionKey: '21:9',
//                 ratio: 21 / 9,
//                 // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
//               },
//             ],
//             presetsFolders: [
//               {
//                 titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
//                 // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
//                 groups: [
//                   {
//                     titleKey: 'facebook',
//                     items: [
//                       {
//                         titleKey: 'profile',
//                         width: 180,
//                         height: 180,
//                         descriptionKey: 'fbProfileSize',
//                       },
//                       {
//                         titleKey: 'coverPhoto',
//                         width: 820,
//                         height: 312,
//                         descriptionKey: 'fbCoverPhotoSize',
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           }}
//           tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK,TABS.FILTERS,TABS.FINETUNE]} // or {['Adjust', 'Annotate', 'Watermark']}
//           defaultTabId={TABS.ANNOTATE} // or 'Annotate'
//           defaultToolId={TOOLS.TEXT} // or 'Text'
//         />
// </div>
<div className="flex flex-col ">
  <div className='self-center'>
    <div className='flex  justify-end z-[100]  left-0 right-0 absolute w-[94vw] md:w-[90vw]'>
    <div className='flex justify-end   md:w-[50vw] w-[90vw]  py-11'>

  <div className='flex gap-6 pr-3'>
  <button type='button' onClick={onChangeText} className='bg-zinc-950 cursor-pointer bg-opacity rounded-full p-1 w-25 md:p-3 text-white'>

<IoText className='ext-white text-[24px] md:text-[36px] p-1 '  />
</button>
    <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>


    <LuDownloadCloud className='text-white text-[24px] md:text-[36px] p-1  cursor-pointer' onClick={onButtonClick}/>
     </div>
     <div className='bg-zinc-950 rounded-full p-1 md:p-3 text-white'>

    <AiOutlineClose className='ext-white text-[24px] md:text-[36px] p-1  cursor-pointer' onClick={closeImgEditor} />
    </div>
  
    </div>
    </div>


    </div>
  <div className="w-[70vw] flex flex-col  ">
{/* <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white self-center">Enter The Text</label>
<input className="w-[40vw] self-center mb-4  bg-gray-50 border w-25 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 type='text' placeholder="Enter the text" onChange={onChange} value={text} />*/}
</div> 
<div ref={ref} className='flex flex-col justify-center aligns-center py-6 '>
{/* <Draggable
        // axis="x"
        // handle=".handle"
        // defaultPosition={{x: 0, y: 0}}
        // position={null}
        // grid={[25, 25]}
        // scale={1}
        // onStart={this.handleStart}
        // onDrag={this.handleDrag}
        // onStop={this.handleStop}
        >
<div>My element is draggable now</div>

</Draggable> */}
{/* <Draggable> */}
{/* {toggleText?
 (  */}
 {toggleText&&
 <div className=' text-fix self-center flex fex-col justify-center absolute cursor-move'>
<input className="md:max-w-[15vw] max-w-[30vw]  self-center mb-4  bg-transparent border  border-none text-white  rounded-lg focus:ring-none focus:border-none block w-full p-2.5 "
 type='text' onChange={onChange} value={text} />
 </div>
}
{/* //  ):<></> 
// } */}
 <img src="frame.png" className='absolute left-0 right-0 text-center flex justify-center self-center w-[90vw] h-[90vh] ' alt="frame"/>
  <img className="w-[90vw] h-[90vh] p-1 " src={image} alt={"img"} />
</div>
</div>
</div>
      ):
      <div className="flex flex-col items-center md:pt-6 " >
         {/* <h1 className="text-center  font-bold sm:text-[24px] md:text-3xl uppercase ml-2 md:ml-0 pt-6 absolute font-sans text-yellow-500">
 Live Image Editor
  </h1> */}
  <button className=" my-6   max-w-[150px] z-10 absolute bottom-[5%]  px-8 py-3 text-lg font-bold text-yellow-500 transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
        Capture</button>
        <img src="frame.png"  className='absolute  w-[90vw] h-[95h]' alt="frame"/>
      <Webcam
      audio={false}
      
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      
      className="p-1 w-[90vw] h-[85vh]"
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
