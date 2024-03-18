import React, { useState, useEffect } from 'react';

function CoinsIndicator({ coins, offers }) {
    const deviceWidth = window.innerWidth < 400 ? window.innerWidth - 50 : 350;
    const [lastRange, setLastRange] = useState(0);
    const [startRange, setStartRange] = useState(0);
    const [coinLength, setCoinLength] = useState(0);
    const [offerLength, setOfferLength] = useState(0);
    const [roundedOfferLength, setRoundedOfferLength] = useState(0);
    const [nearestOffer, setNearestOffer] = useState(0);

    function formatThousandValues(value){
        if(value >= 1000){
            return `${value/1000}k`
        }
        else if(value > 0 && value < 1000){
            return `${(value/1000).toFixed(1)}k`
        }
        else{
            return '0k'
        }
    }

    function calculateIndicatorValues(range=1000, totalCoins=coins, offersArray=offers){
        // range of the bar [lowerLimit, upperLimit] such that upperLimit - lowerLimit = range
        const lowerLimit = Math.floor(totalCoins/range) * range;
        const upperLimit = (Math.floor(totalCoins/range) + 1) * range;
        // length of the moveCoin bar calculated as per the total coins
        const moveCoinBarLength = ((totalCoins - lowerLimit) / range) * deviceWidth;

        // calculation of the nearest offer as per the movecoins user has
        let maxOffer = Infinity;
        offersArray && offersArray.map((offer) => {
            if (offer?.requiredMovecoins - totalCoins >= 0 && offer?.requiredMovecoins - totalCoins <= maxOffer && offer?.requiredMovecoins <= upperLimit && offer?.requiredMovecoins >= lowerLimit) {
                maxOffer = offer?.requiredMovecoins;
                setNearestOffer(maxOffer);
            }
        })

        // setting the values to their respective states
        setLastRange(upperLimit);
        setStartRange(lowerLimit);
        // case handled when the moveCoinBarLength is 0, i.e. moveCoins = lowerLimit
        setCoinLength(prev => moveCoinBarLength === 0 ? deviceWidth/200 : moveCoinBarLength);

        if(nearestOffer > 0 && nearestOffer <= upperLimit && nearestOffer >= lowerLimit){
            const calculatedOfferLength = ((nearestOffer - lowerLimit) / range) * deviceWidth;
            const roundedOfferLength = calculatedOfferLength === 0 ? 0 : Math.floor(calculatedOfferLength);
            setOfferLength(calculatedOfferLength);
            // rounded offer length is needed to make an array of this size(integer) and to render the yellow bars
            setRoundedOfferLength(roundedOfferLength);
        }
       console.log('nearesOffer', nearestOffer)
    }
    useEffect(() => {
        calculateIndicatorValues();
    }, [coins, offers]);


    return (
        <div className='w-full flex flex-col justify-center items-center gap-7 px-3'>
            <div className='flex flex-col items-center justify-center gap-1 relative' style={{ width: deviceWidth }}>
                <div className='h-[12px] rounded-[24px] bg-gradient-to-r from-blue-gray-800/30 to to-gray-800/100 relative' style={{ width: deviceWidth }}>
                    <div className={`bg-green rounded-[24px] h-full absolute flex flex-row items-center z-[10]`} style={{ width: coinLength }}>
                        {coinLength >= 8 && <div className='bg-white rounded-full w-[8px] h-[8px] absolute right-[2px]'></div>}
                    </div>
                    {nearestOffer > 0 && nearestOffer <= lastRange &&
                        <div className={`rounded-[24px] h-full absolute flex flex-row items-center z-[5]`} style={{ width: offerLength }}>
                            {roundedOfferLength !== 0 && [...Array(Number(roundedOfferLength))].map((_, index) => {
                                if (index % 5 === 0 && index !== 0 && index <= roundedOfferLength - 4) {
                                    return <div key={index} className='bg-yellow rounded-full w-[2px] h-[10px] absolute rounded-t-sm rounded-b-sm' style={{ left: index }}></div>;
                                }
                                return null; // Default return value
                            })}
                            <div className='bg-yellow rounded-full w-[16px] h-[16px] absolute right-[0px] flex flex-row items-center justify-center'>
                                <div className='bg-white rounded-full w-[8px] h-[8px] absolute'></div>
                            </div>
                        </div>
                    }
                </div>
                <div className='text-[12px] text-[#545454] absolute left-0 top-[-20px]'>{formatThousandValues(startRange)}</div>
                <div className='text-[12px] text-[#545454] absolute right-0 top-[-20px]'>{formatThousandValues(lastRange)}</div>
                <div className={`text-[12px] text-[#545454] absolute top-[100%]`} style={{ left: coinLength - 10}}>{formatThousandValues(coins)}</div>
                {offerLength > 15 && <div className={`text-[12px] text-[#545454] absolute top-[100%]`} style={{ left: offerLength - 15 }}>{formatThousandValues(nearestOffer)}</div>}
                {nearestOffer > 0 && nearestOffer <= lastRange &&
                    <div className={`w-[100px] h-[50px] text-[12px] text-black font-bold absolute top-[-35px] bg-no-repeat bg-cover flex flex-row justify-center items-start`} style={{ left: offerLength - 58, backgroundImage: `url(${'/assets/offer_dialogue.svg'})` }}>
                        <div className='pt-1'>New Offer</div>
                    </div>
                }
            </div>
            
                <div className='text-white/50 text-[14px] font-light'>
                    {nearestOffer > 0 && nearestOffer <= lastRange? `You are just ${nearestOffer - coins} Movecoins away from unlocking a new offer!` : `No milestone for new offers yet.`}
                </div>
            
        </div>
    );
}

export default CoinsIndicator;
