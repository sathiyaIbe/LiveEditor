/* eslint-disable */
'use client';
import React from "react";
import {useEffect} from "react";
import Webcam from "react-webcam";
import dynamic from "next/dynamic";
const FilerobotImageEditor = dynamic(( 
  ) => import("react-filerobot-image-editor"), {
  ssr: false,

});

const {TABS,TOOLS} = (() => import("react-filerobot-image-editor"));
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

  // const openImgEditor = () => {
  //   setIsImgEditorShown(true);
  // };.
  if (typeof window !== "undefined") {
    // Client-side-only code
  }

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
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


function saved(url,name) {
  const a = document.createElement("a"); //Create <a>
            a.href = url.imageBase64 //Image Base64 Goes here
            a.download =url.fullName; //File name Here
            a.click(); //Downloaded file
  console.log(url);

}



return(
  <section>
 
      <div>
      {/* <button onClick={openImgEditor}>Open Filerobot image editor</button> */}
      {isImgEditorShown ? (
        <div className="h-[700px] w-[500px]  md:w-[1300px] md:h-[700px]">
        <FilerobotImageEditor
        className="filerobot-editor w-[600px] h-[650px]"
       
          source={image}
          onSave={(editedImageObject, designState) =>
            saved(editedImageObject,designState)

          }
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Enter Text' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,
                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          // tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK,TABS.FILTERS,TABS.RESIZE,TABS.FINETUNE]} // or {['Adjust', 'Annotate', 'Watermark']}
          // defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          // defaultToolId={TOOLS.TEXT} // or 'Text'
        />
</div>
      ):
      <div className="flex flex-col items-center" >
      <Webcam
      audio={false}
      height={300}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={700}
      videoConstraints={videoConstraints} />
      <button className=" my-6 relative z-10 inline-flex items-center justify-center  px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
        Capture</button>
    </div>
      
      }
    </div>
 
    {/* <div id="draggable" class="no-select ">{text}</div> */}

    
    

  </section>
)
}
export default Hero;
