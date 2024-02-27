import React, { useState } from 'react'

function ProfilePicture({inputPic, altText, width, height}) {
    const [isZoomed, setIsZoomed] = useState(false);
    function handleZoom(){
        setIsZoomed(true);
    }
  return (
    <>
        <img src={inputPic} alt={altText} className={`w-[${width}] h-[${height}] rounded-full object-cover`} onClick={handleZoom}/>
        {
            isZoomed && (
                <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50' onClick={()=>setIsZoomed(false)}>
                    <img src={inputPic} alt={altText} className='sm:w-[300px] sm:h-[300px] md:w-[600px] md:h-[600px] aspect-auto object-contain' />
                </div>
            )
        }
    </>
  )
}

export default ProfilePicture