import React, { useState, useEffect, useRef } from 'react';

function CoinsIndicator({ coins, offers }) {
    const deviceWidth = window.innerWidth < 400 ? window.innerWidth - 50 : 350;
    const [lastRange, setLastRange] = useState(0);
    const [startRange, setStartRange] = useState(0);
    const [coinLength, setCoinLength] = useState(0);
    const [offersLength, setOffersLength] = useState([]);
    const [offersArray, setOffersArray] = useState([]);
    const [nearestOffer, setNearestOffer] = useState(0);
    const coinsRef = useRef(null);

    function formatThousandValues(value) {
        if (value >= 1000) {
            return `${value / 1000}k`
        }
        else if (value > 0 && value < 1000) {
            return `${(value / 1000).toFixed(1)}k`
        }
        else {
            return '0k'
        }
    }

    function calculateIndicatorValues(range = 6000, totalCoins = coins, offersArray = offers) {
        // range of the bar [lowerLimit, upperLimit] such that upperLimit - lowerLimit = range
        // const lowerLimit = Math.floor(totalCoins / range) * range;
        const lowerLimit = 0;
        const upperLimit = lowerLimit + range;

        // length of the moveCoin bar calculated as per the total coins
        const moveCoinBarLength = totalCoins - lowerLimit < 500 && totalCoins !== 0 ? (500/range) * deviceWidth : (totalCoins > 6000) ? (6000 / range) * deviceWidth : ((totalCoins - lowerLimit) / range) * deviceWidth;

        // calculation of the nearest offer as per the movecoins user has
        let maxOffer = Infinity;
        offersArray && offersArray.map((offer) => {
            if (offer?.requiredMovecoins <= upperLimit && offer?.requiredMovecoins >= lowerLimit) {
                if (offer?.requiredMovecoins - totalCoins <= maxOffer && offer?.requiredMovecoins - totalCoins > 0) {
                    maxOffer = offer?.requiredMovecoins;
                    setNearestOffer(maxOffer)
                }
                const calculatedOfferLength = ((offer?.requiredMovecoins - lowerLimit) / range) * deviceWidth;
                setOffersArray(prev => [...prev, offer?.requiredMovecoins])
                setOffersLength(prev => [...prev, calculatedOfferLength]);
            }
        })

        // setting the values to their respective states
        setLastRange(upperLimit);
        setStartRange(lowerLimit);
        // case handled when the moveCoinBarLength is 0, i.e. moveCoins = lowerLimit
        setCoinLength(prev => moveCoinBarLength === 0 ? deviceWidth / range : moveCoinBarLength);
    }
    useEffect(() => {
        calculateIndicatorValues();
    }, []);


    return (
        <div className='w-full flex flex-col justify-center items-center gap-7 px-3'>
            <div className='flex flex-col items-center justify-center gap-1 relative' style={{ width: deviceWidth }}>
                <div className='h-[12px] rounded-[24px] bg-gradient-to-r from-blue-gray-800/30 to to-gray-800/100 relative' style={{ width: deviceWidth }}>
                    <div className={`bg-green rounded-[24px] h-full absolute flex flex-row items-center z-[10]`} style={{ width: coinLength }} />
                    <div className='w-full h-full flex flex-row items-center relative'>
                        {
                            offersLength.length !== 0 && offersLength?.map((offerLength, index) => {
                                return (
                                    <div key={index}>
                                        <div className={`w-[18px] h-[18px] rounded-full ${offerLength <= coinLength ? 'bg-green' : 'bg-white/20'} backdrop-blur-lg absolute`} style={{ left: offerLength - 9 }} />
                                        {/* <div className={`text-[13px] font-extrabold  ${offerLength <= coinLength ? 'text-green' : 'text-[#545454]'} absolute top-[-25px]`} style={{ left: offerLength }}>{formatThousandValues(offersArray[index])}</div> */}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={`text-[12px] text-green absolute top-[100%]`} style={{ left: coinLength - (coinsRef.current?.offsetWidth)/2 - 5}} ref={coinsRef}>{coins}</div>
            </div>

            <div className='text-white/50 text-[14px] font-light'>
                {nearestOffer > startRange && nearestOffer <= lastRange && coins < nearestOffer ? <p>Earn <span className='text-green'>{nearestOffer - coins}</span> more to unlock a new offer!</p> : <p>No milestone for new offers yet.</p>}
            </div>

        </div>
    );
}

export default CoinsIndicator;
