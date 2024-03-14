import React, { useState, useEffect } from 'react';

const dummyOffers = [
    { requiredCoins: 500, offer: '1,000 coins' },
    { requiredCoins: 800, offer: '2,000 coins' },
    { requiredCoins: 3000, offer: '3,000 coins' },
];

function CoinsIndicator({ coins = 600, offers = dummyOffers }) {
    const deviceWidth = window.innerWidth < 400 ? window.innerWidth - 50 : 350;
    const [lastRange, setLastRange] = useState(0);
    const [coinLength, setCoinLength] = useState(0);
    const [offerLength, setOfferLength] = useState(0);
    const [roundedOfferLength, setRoundedOfferLength] = useState(0);
    const [nearestOffer, setNearestOffer] = useState(0);

    useEffect(() => {
        let maxOffer = 100000;
        offers.forEach((offer) => {
            if (offer.requiredCoins - coins >= 0 && offer.requiredCoins - coins <= maxOffer) {
                maxOffer = offer.requiredCoins;
                setNearestOffer(offer.requiredCoins);
            }
        });
    
        if (coins > 0) {
            const range = Math.ceil(maxOffer / 1000) * 1000 > Math.ceil(coins / 1000) * 1000 ? Math.ceil(maxOffer / 1000) * 1000 : Math.ceil(coins / 1000) * 1000;
            setLastRange(range);
            const lengthOfCoin = (coins / range) * deviceWidth;
            setCoinLength(lengthOfCoin);
            
            const calculatedOfferLength = (maxOffer / range) * deviceWidth;
            const roundedOfferLength = calculatedOfferLength === 0 ? 0 :  Math.floor(calculatedOfferLength);
            setOfferLength(calculatedOfferLength);
            setRoundedOfferLength(roundedOfferLength);
        } else {
            setLastRange(1000);
            setCoinLength(0);
            setOfferLength(0);
            setRoundedOfferLength(0);
        }
    }, [coins, offers, lastRange, roundedOfferLength]);
    

    return (
        <div className='w-full flex flex-col justify-center items-center gap-7 px-3'>
            <div className='flex flex-col items-center justify-center gap-1 relative' style={{width: deviceWidth}}>
                <div className='h-[12px] rounded-[24px] bg-gradient-to-r from-blue-gray-800/30 to to-gray-800/100 relative' style={{width: deviceWidth}}>
                    <div className={`bg-green rounded-[24px] h-full absolute flex flex-row items-center z-[10]`} style={{ width: coinLength }}>
                        <div className='bg-white rounded-full w-[8px] h-[8px] absolute right-[4px]'></div>
                    </div>
                    <div className={`rounded-[24px] h-full absolute flex flex-row items-center z-[5]`} style={{ width: offerLength }}>
                        {roundedOfferLength !== 0 && [...Array(Number(roundedOfferLength))].map((_, index) => {
                            if (index % 5 === 0 && index !== 0 && index <= roundedOfferLength - 4) {
                                return <div key={index} className='bg-yellow rounded-full w-[2px] h-[12px] absolute rounded-t-sm rounded-b-sm' style={{ left: index }}></div>;
                            }
                            return null; // Default return value
                        })}
                        <div className='bg-yellow rounded-full w-[16px] h-[16px] absolute right-[0px] flex flex-row items-center justify-center'>
                            <div className='bg-white rounded-full w-[8px] h-[8px] absolute'></div>
                        </div>
                    </div>
                </div>
                <div className='text-[12px] text-[#545454] absolute left-0 top-[100%]'>0</div>
                <div className='text-[12px] text-[#545454] absolute right-0 top-[100%]'>{lastRange}</div>
                <div className={`text-[12px] text-[#545454] absolute top-[100%]`} style={{ left: coinLength - 10 }}>{coins}</div>
                <div className={`w-[100px] h-[50px] text-[12px] text-black font-bold absolute top-[-35px] bg-no-repeat bg-cover flex flex-row justify-center items-start`} style={{ left: offerLength - 58, backgroundImage: `url(${'/assets/offer_dialogue.svg'})` }}>
                    <div className='pt-1'>New Offer</div>
                </div>
            </div>
            <div className='text-white/50 text-[14px] font-light'>
                You are just {nearestOffer - coins } Movecoins away from unlocking a new offer!
            </div>
        </div>
    );
}

export default CoinsIndicator;
