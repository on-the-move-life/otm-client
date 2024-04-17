import React from 'react'
import "./Loader.css";
function Loader({ className, message }) {
    return (
        <div class={`loading w-full flex flex-col items-center justify-center gap-[7rem] ${className !== undefined ? className : 'h-screen'}`}>
            <svg width="64px" height="48px">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
            <div>
                {
                    message !== undefined &&
                    <p className='text-md font-semibold text-[#7e87ef]'>{message}</p>
                }
            </div>
        </div>
    )
}

export default Loader