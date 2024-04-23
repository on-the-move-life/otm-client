import React, { useRef, useEffect, useState } from 'react'

function ProgressBar({currValue, totalValue}) {
    const widthRef = useRef(null);
    const [totalLength, setTotalLength] = useState(0);
    const [progressLength, setProgressLength] = useState(0);

    useEffect(() => {
        setTotalLength(widthRef.current?.clientWidth);
        // setting the progress length according to the currValue
        setProgressLength((currValue/totalValue) * totalLength);
    }, [currValue, totalValue, totalLength])

  return (
    <div ref={widthRef} className='w-[250px] h-[3px] rounded-[30px] bg-white/20'>
        <div className='h-[3px] rounded-[30px] bg-white' style={{width: progressLength}}/>
    </div>
  )
}

export default ProgressBar