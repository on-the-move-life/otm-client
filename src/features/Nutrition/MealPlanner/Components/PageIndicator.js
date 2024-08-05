import React from 'react'

function PageIndicator({ currentPage, totalNumberOfPages }) {
    // for 5 pages, its width is 62.5px
    const calculatedWidth = (62.5/5)*totalNumberOfPages;
    const backgroundColoredWidth = (currentPage/totalNumberOfPages)*calculatedWidth;
  return (
    <div style={{width: calculatedWidth, height: '12.5px'}} className='relative'>
        <div style={{width: backgroundColoredWidth, height: '12.5px', borderRadius: '12.5px'}} className='bg-green absolute -z-10'></div>
        <div className='w-full h-full flex flex-row justify-around items-center'>
            {
                [...Array(totalNumberOfPages)].map((item, index) => {
                    return(
                        <div key={index} className='bg-white w-[5px] h-[5px] rounded-full'/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default PageIndicator