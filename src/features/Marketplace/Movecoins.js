import React from 'react'
import { MoveCoins } from './StyledComponents'

function Movecoins({ fontSize, coins }) {
    return (
        <div className='h-fit flex flex-row justify-center items-center gap-1'>
            <img src={"/assets/otm-logo-marketplace.svg"} alt="otm logo" style={{ height: fontSize, width: fontSize }} />
            <MoveCoins fontSize={fontSize}>{coins}</MoveCoins>
        </div>
    )
}

export default Movecoins