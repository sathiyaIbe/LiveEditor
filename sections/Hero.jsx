'use client';
import React from "react";
import {useEffect} from "react";
import Webcam from "react-webcam";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

const Hero = () =>
{
  const [video, setVideo] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [text, setText] = React.useState("Enter text");
  const [isImgEditorShown, setIsImgEditorShown] = React.useState(false);

  // const openImgEditor = () => {
  //   setIsImgEditorShown(true);
  // };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };
useEffect(() =>{
    
    // const draggable=document.getElementById("draggable");
    //   var isMouseDown,initX,initY,height = draggable?.offsetHeight,width = draggable?.offsetWidth;
    
    //   draggable?.addEventListener('mousedown', function(e) {
    //     isMouseDown = true;
    //     document.body.classList.add('no-select');
    //     initX = e.offsetX;
    //     initY = e.offsetY;
    //   })
      
    //   document?.addEventListener('mousemove', function(e) {
    //     if (isMouseDown) {
    //       var cx = e.clientX - initX,
    //           cy = e.clientY - initY;
    //       if (cx < 0) {
    //         cx = 0;
    //       }
    //       if (cy < 0) {
    //         cy = 0;
    //       }
    //       if (window.innerWidth - e.clientX + initX < width) {
    //         cx = window.innerWidth - width;
    //       }
    //       if (e.clientY > window.innerHeight - height+ initY) {
    //         cy = window.innerHeight - height;
    //       }
    //       draggable.style.left = cx + 'px';
    //       draggable.style.top = cy + 'px';
    //     }
    //   })
      
    //   draggable?.addEventListener('mouseup', function() {
    //     isMouseDown = false;
    //     document.body.classList.remove('no-select');
    //   })


   
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
        <div className="flex justify-center">
        <div className="w-[1000px] flex justify-center" >
        <FilerobotImageEditor
          source={image}
          onSave={(editedImageObject, designState) =>
            saved(editedImageObject,designState)

          }
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Filerobot...' }}
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
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK,TABS.FILTERS,TABS.RESIZE,TABS.FINETUNE]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
        />
    </div>
    </div>

      ):
      <div className="flex flex-col items-center" >
      <Webcam
      audio={false}
      height={320}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={780}
      videoConstraints={videoConstraints} />
      <button className=" my-6 relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={capture}>
        Capture</button>
    </div>
      
      }
    </div>
 
    {/* <div id="draggable" class="no-select ">{text}</div> */}

    
    

  </section>
)
}
export default Hero;
