import React, { useState, useRef, useEffect } from 'react';
import { StatusTagText, DiscountTag, DiscountDescription, ExpiryDescription, NextSteps, GradientText } from './StyledComponents';
import Movecoins from './Movecoins';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for exit animations
import Button from '../../components/Button';
import { formatDate } from './utils';

function PurchaseTile({ purchaseId, coinsRequired, value, purchaseDate, expiryDate, isRedeemed, redeemCode, redeemDate, description }) {
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
                className='w-full h-fit py-5 rounded-b-md bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center gap-3 fixed bottom-0 left-0'
            >
                <p className='text-xl font-medium text-center text-gray-500'>
                    {
                        isRedeemed ? 'You have already redeemed this offer' : `Are you sure you want to redeem this offer?`
                    }
                </p>
                {!isRedeemed && <p className='text-sm text-[#D6B6F0]'>Once you redeem, you cannot reverse this action.</p>}
                {!isRedeemed ?
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Redeem" type="marketplace" action={redeemCoupon} />
                        <Button text="Cancel" type="marketplace" action={() => setShowPopUp(false)} />
                        {/* <div className='bg-green py-1 px-4 rounded-md' onClick={redeemCoupon}>YES</div>
                        <div className='bg-red py-1 px-4 rounded-md' onClick={() => setShowPopUp(false)}>NO</div> */}
                    </div> :
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Close" type="marketplace" action={() => setShowPopUp(false)} />
                    </div>}
                <div ref={popUpRef}></div>
            </motion.div>
        )
    }
    const RedeemPopUp = () => {
        return (
            <motion.div
                className='w-full min-h-screen bg-no-repeat bg-bottom bg-contain overflow-y-scroll'
                style={{ backgroundImage: `url(${'/assets/achievements-bg.png'})` }}
                initial={{ opacity: 0, scale: 0.9 }} // Start with reduced scale and opacity
                animate={{ opacity: 1, scale: 1 }} // Animate to full scale and opacity
                exit={{ opacity: 0 }} // Fade out on exit
                transition={{ duration: 0.3 }} // Optional: Set the duration of the animation
            >
                <div className='w-full min-h-screen bg-black/60 backdrop-blur-sm flex flex-col justify-around items-center gap-[5rem] px-3 pt-[30px] pb-[30px]'>
                    <div className='h-full flex flex-col justify-start items-start gap-[5rem]'>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <img src="/assets/congratulations2.svg" alt="" />
                            <p className='text-xl font-semibold text-[#7E87EF] tracking-wider text-center uppercase'>{description}</p>
                        </div>
                        <div className="h-full flex flex-col justify-center items-start gap-[7rem]">
                            <div className='flex flex-col justify-center items-start gap-2'>
                                <NextSteps>Next Steps..</NextSteps>
                                <p className='text-md text-[#B1B1B1] font-light'>Present this code to the team to avail this offer</p>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-1'>
                                <div className='w-full h-fit flex flex-row justify-center items-center py-5 rounded-lg border-[1px] border-[#7E87EF87]'>
                                    <p className='text-3xl font-black'>{redeemCode}</p>
                                </div>
                                <p className='text-xs text-[#B1B1B1] font-light tracking-wider'>This code will expire on {formatDate(expiryDate, false)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full grow flex flex-col items-center justify-end gap-3'>
                        <GradientText>Keep crushing your workouts to unlock more offers and discounts</GradientText>
                        <Button text="Close" type="marketplace" action={closeRedeemPopUp} />
                    </div>
                </div>
            </motion.div>
        )
    }
    return (
        <div>
            <div className={`w-[171px] min-h-[133px] border-[0.5px] border-[#383838] rounded-[12px] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2 flex flex-col justify-start items-start gap-2 ${!isRedeemed ? 'opacity-1' : 'opacity-[0.5]'}`} onClick={() => setShowRedeemPopUp(true)}>
                {isRedeemed ? <StatusTagText className='bg-[#F5C563] w-fit p-[2px] rounded-sm'>Redeemed on {formatDate(redeemDate)}</StatusTagText> : <StatusTagText className='bg-[#F5C563] w-fit p-[2px] rounded-sm'>Not Redeemed</StatusTagText>}
                <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
                <ExpiryDescription>Purchased on {formatDate(purchaseDate, false)}</ExpiryDescription>
                <DiscountTag>{value}</DiscountTag>
                <DiscountDescription>{description}</DiscountDescription>
                <ExpiryDescription>Expires on {formatDate(expiryDate, false)}</ExpiryDescription>
            </div>
            {/* AnimatePresence to handle exit animations */}
            <AnimatePresence>
                {showPopUp && <div className='h-full w-full bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-[50]'><PopUp /></div>}
            </AnimatePresence>
            <AnimatePresence>
                {showRedeemPopUp && <div className='h-full w-full bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-[50] overflow-y-scroll' ref={redeemPopUpRef}><RedeemPopUp /></div>}
            </AnimatePresence>
        </div>
    )
}

export default PurchaseTile;
