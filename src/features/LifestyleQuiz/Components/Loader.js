import React from 'react'
import "./Loader.css";
function Loader({className}) {
    return (
        <div class={`loading w-full flex flex-row items-center justify-center ${className !== undefined ? className : 'h-screen'}`}>
            <svg width="64px" height="48px">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
        </div>
    )
}

export default Loader