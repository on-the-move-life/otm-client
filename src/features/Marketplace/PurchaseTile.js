import React, { useState, useRef, useEffect } from 'react';
import { StatusTagText, DiscountTag, DiscountDescription } from './StyledComponents';
import Movecoins from './Movecoins';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for exit animations
import Button from '../../components/Button';

function PurchaseTile({ purchaseId, coinsRequired, value = "-50%", purchaseDate, expiryDate, isRedeemed, redeemCode, redeemDate, description }) {
    const [showPopUp, setShowPopUp] = useState(false);
    const [showRedeemPopUp, setShowRedeemPopUp] = useState(false);
    const popUpRef = useRef(null);
    const redeemPopUpRef = useRef(null);

    function redeemCoupon() {
        // call the API when clicked "YES" on the pop-up
        setShowRedeemPopUp(true);
        setShowPopUp(false);
    }
    function closeRedeemPopUp() {
        setShowRedeemPopUp(false);
    }
    // this function changes the date-time format received from API to more readable format
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    }
    useEffect(() => {
        popUpRef.current?.scrollIntoView({ behavior: 'smooth' });
        redeemPopUpRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [showPopUp, showRedeemPopUp])

    const PopUp = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }} // Initial animation properties
                animate={{ opacity: 1, y: 0 }} // Animation properties when pop-up is visible
                exit={{ opacity: 0, y: -20 }} // Animation properties when pop-up is hidden
                transition={{ duration: 0.3 }} // Animation duration
                className='w-full h-fit py-5 rounded-b-md bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center gap-3'
            >
                <p className='text-xl font-medium text-center text-gray-500'>
                    {
                        isRedeemed ? 'You have already redeemed this offer' : `Are you sure you want to redeem this offer?`
                    }
                </p>
                {!isRedeemed && <p className='text-sm text-[#D6B6F0]'>Once you redeem, you cannot reverse this action.</p>}
                {!isRedeemed ?
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Redeem" action={redeemCoupon} />
                        <Button text="Cancel" action={() => setShowPopUp(false)} />
                        {/* <div className='bg-green py-1 px-4 rounded-md' onClick={redeemCoupon}>YES</div>
                        <div className='bg-red py-1 px-4 rounded-md' onClick={() => setShowPopUp(false)}>NO</div> */}
                    </div> :
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Close" action={() => setShowPopUp(false)} />
                    </div>}
            </motion.div>
        )
    }
    const RedeemPopUp = () => {
        return (
            <motion.div
                className='w-full h-screen bg-no-repeat bg-bottom bg-contain'
                style={{ backgroundImage: `url(${'/assets/redeem_popup_background.svg'})` }}
                initial={{ opacity: 0, scale: 0.9 }} // Start with reduced scale and opacity
                animate={{ opacity: 1, scale: 1 }} // Animate to full scale and opacity
                exit={{ opacity: 0 }} // Fade out on exit
                transition={{ duration: 0.3 }} // Optional: Set the duration of the animation
            >
                <div className='w-full h-full bg-black/60 backdrop-blur-sm flex flex-col justify-around items-start px-3 pt-[50px] pb-[30px]'>
                    <div className='h-full flex flex-col justify-start items-start gap-[9rem]'>
                        <div className='flex flex-col justify-center items-start gap-5'>
                            <h3 className='text-3xl text-[#7E87EF] font-semibold'>Congratulations!</h3>
                            <p className='text-sm text-gray-500'>You just unlocked "{description}" coupon</p>
                        </div>
                        <div className="h-full flex flex-col justify-start items-start gap-[5rem]">
                            <div className='flex flex-col justify-center items-start gap-2'>
                                <h3 className='text-2xl text-[#7E87EF] font-semibold'>Next Step</h3>
                                <p className='text-md text-gray-500'>Present this code to the team to avail this offer</p>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <div className='border-green border-[1px] rounded-[4px] px-3 py-1'>
                                    <p className='text-[#caceff] font-semibold'>{redeemCode}</p>
                                </div>
                                <p className='text-sm text-gray-500'>Expires on {expiryDate}</p>
                            </div>
                        </div>
                    </div>
                    <p className='text-md text-gray-300'>Keep crushing your workouts to unlock more offers and discounts</p>
                    <Button text="Close" action={closeRedeemPopUp} />
                </div>
            </motion.div>
        )
    }
    return (
        <div>
            <div className={`w-[171px] min-h-[133px] border-[0.5px] border-[#383838] rounded-[12px] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2 flex flex-col justify-start items-start gap-2 ${!isRedeemed ? 'opacity-1' : 'opacity-[0.3]'}`} onClick={() => setShowPopUp(true)}>
                {isRedeemed ? <StatusTagText className='bg-[#F5C563] w-fit p-[2px] rounded-sm'>Redeemed on {formatDate(redeemDate)}</StatusTagText> : <StatusTagText className='bg-[#F5C563] w-fit p-[2px] rounded-sm'>Not Redeemed</StatusTagText>}
                <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
                <DiscountDescription>Purchased on {formatDate(purchaseDate)}</DiscountDescription>
                <DiscountTag>{value}</DiscountTag>
                <DiscountDescription>{description}</DiscountDescription>
                <DiscountDescription>Expires on {formatDate(expiryDate)}</DiscountDescription>
            </div>
            {/* AnimatePresence to handle exit animations */}
            <AnimatePresence>
                {showPopUp && <div className='h-full w-full bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-[50]' ref={popUpRef}><PopUp /></div>}
            </AnimatePresence>
            <AnimatePresence>
                {showRedeemPopUp && <div className='h-full w-full bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-[50]' ref={redeemPopUpRef}><RedeemPopUp /></div>}
            </AnimatePresence>
        </div>
    )
}

export default PurchaseTile;
