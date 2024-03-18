import React, { useState, useRef, useEffect } from 'react';
import { StatusTagText, DiscountTag, DiscountDescription } from './StyledComponents';
import Movecoins from './Movecoins';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for exit animations
import Button from '../../components/Button';
import { axiosClient } from './apiClient';

function OfferTile({ offerId, coins, coinsRequired, type, description, isAvailable, statusTag, discountValue}) {
    const [showPopUp, setShowPopUp] = useState(false);
    const popUpRef = useRef(null);

    function buyOffer(){
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('offer ID : ', offerId)
        // call the API when clicked "YES" on the pop-up
        axiosClient.post(`/purchase`, {
            member: userData?.code,
            offer: offerId,
            event: 'purchase'
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => setShowPopUp(false));
    }

    useEffect(() => {
        popUpRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [showPopUp])

    const PopUp = () => {
        return (
            <motion.div 
                initial={{ opacity: 0, y: -20 }} // Initial animation properties
                animate={{ opacity: 1, y: 0 }} // Animation properties when pop-up is visible
                exit={{ opacity: 0, y: -20 }} // Animation properties when pop-up is hidden
                transition={{ duration: 0.3 }} // Animation duration
                className='w-full h-fit py-5 rounded-b-md bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center gap-3'
            >
                <p className='text-xl font-medium text-center text-gray-500'>{
                    coins < coinsRequired ? 'You do not have enough coins to avail this offer' : `Are you sure you want to buy this offer for ${coinsRequired} Movecoins?`
                }</p>
                {coins >= coinsRequired && <p className="text-green text-sm">Current Balance : {coins} Movecoins</p>}
                {coins >= coinsRequired && <p className='text-sm text-[#D6B6F0]'>Once you buy, you cannot reverse this action.</p>}
                {coins >= coinsRequired ?
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Buy" action={buyOffer}/>
                        <Button text="Cancel" action={() => setShowPopUp(false)}/>
                        {/* <div className='bg-green py-1 px-4 rounded-md' onClick={buyOffer}>YES</div>
                        <div className='bg-red py-1 px-4 rounded-md' onClick={() => setShowPopUp(false)}>NO</div> */}
                    </div> : 
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Close" action={() => setShowPopUp(false)}/>
                    </div>}
            </motion.div>
        )
    }

    return (
        <div>
            <div className={`w-[171px] min-h-[133px] border-[0.5px] border-[#383838] rounded-[12px] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2 flex flex-col justify-start items-start gap-2 ${isAvailable ? 'opacity-1' : 'opacity-[0.3]'}`} onClick={() => setShowPopUp(true)}>
                <StatusTagText className='bg-[#7E87EF] w-fit p-[2px] rounded-sm'>{statusTag}</StatusTagText>
                <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
                <DiscountTag>{discountValue}</DiscountTag>
                <DiscountDescription>{description}</DiscountDescription>
            </div>
            {/* AnimatePresence to handle exit animations */}
            <AnimatePresence>
                {showPopUp && <div className='h-full w-full bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-[50]' ref={popUpRef}><PopUp /></div>}
            </AnimatePresence>
        </div>
    )
}

export default OfferTile;
