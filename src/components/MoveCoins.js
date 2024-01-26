import React, { useMemo } from 'react'
import styled from 'styled-components'
import BGMoveCoins from "../assets/images/bg-movecoins.svg"

const Heading = styled.div`
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 3px;
text-transform: uppercase;
mix-blend-mode: plus-lighter;
`
const Coins = styled.div`
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: 40px;
background: var(--Green-purple-gradient, linear-gradient(96deg, #9BF2C0 1.49%, #91BDF6 103.49%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
const Description = styled.div`
color: #545454;
font-family:-apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.333px;
font-style: normal;
font-weight: 500;
line-height: normal;
mix-blend-mode: plus-lighter;
`
function MoveCoins({ coins }) {
    function formatNumberWithCommas(number) {
        // Convert the number to a string
        const numberString = number.toString();

        // Use a regular expression to add commas
        const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return formattedNumber;
    }
    const formattedCoins = useMemo(() => formatNumberWithCommas(coins), [coins]);
    return (
        <div className="w-6/12 h-[104px] flex flex-col items-center justify-center gap-2 rounded-[12px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${BGMoveCoins})` }}>
            <Heading>Movecoins</Heading>
            <Coins>{formattedCoins}</Coins>
            <Description>Use at OTM marketplace</Description>
        </div>
    )
}

export default MoveCoins