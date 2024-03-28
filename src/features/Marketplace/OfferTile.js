import React, { useState, useRef, useEffect } from 'react';
import { StatusTagText, DiscountTag, DiscountDescription, NextSteps, GradientText } from './StyledComponents';
import Movecoins from './Movecoins';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for exit animations
import Button from '../../components/Button';
import { axiosClient } from './apiClient';
import { formatDate } from './utils';

function OfferTile({ offerId, coins, coinsRequired, type, description, discountValue, setTotalPurchaseData, setData }) {
    const [showPopUp, setShowPopUp] = useState(false);
    const popUpRef = useRef(null);
    const [showCongratulationsScreen, setShowCongratulationsScreen] = useState('');
    const [purchaseData, setPurchaseData] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const [statusTag, setStatusTag] = useState('');

    function buyOffer() {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('offer ID : ', offerId)
        // call the API when clicked "YES" on the pop-up
        axiosClient.post(`/purchase`, {
            member: userData?.code,
            offer: offerId,
            event: 'purchase'
        })
            .then(res => {
                console.log(res.data)
                setPurchaseData(res.data);
                setData(prev => {
                    const tempObj = {};
                    Object.keys(prev).map((key, index) => {
                        tempObj[key] = prev[key];
                    })
                    tempObj["moveCoins"] = res.data?.moveCoins;
                    return tempObj;
                })
                // newPurchaseData is introduced to store the requiredMovecoins on the res.data response
                const newPurchaseData = res.data;
                newPurchaseData["requiredMovecoins"] = coinsRequired;
                setTotalPurchaseData(purchaseData => [newPurchaseData, ...purchaseData]);
                setShowCongratulationsScreen('purchaseSuccess');
            })
            .catch(err => {
                console.log(err);
                setShowCongratulationsScreen('purchaseFailed');
            })
            .finally(() => setShowPopUp(false));
    }

    useEffect(() => {
        popUpRef.current?.scrollIntoView({ behavior: 'smooth' });
        setIsAvailable(coins >= coinsRequired);
        if (coins < coinsRequired) {
            setStatusTag(`Earn ${coinsRequired - coins} more to unlock`)
        }
        else {
            setStatusTag('Available')
        }
    }, [showPopUp, coins, coinsRequired, statusTag])

    const AnimatedTile = () => {
        return (
            <div className={`w-[171px] min-h-[133px] border-[0.5px] border-[#383838] rounded-[12px] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2 flex flex-col justify-start items-start gap-2 opacity-1}`}>
                <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
                <DiscountTag>{discountValue}</DiscountTag>
                <DiscountDescription>{description}</DiscountDescription>
            </div>
        )
    }
    const CongratulationsScreen = () => {
        return (
            <div className={`min-h-screen px-3 py-2 flex flex-col ${showCongratulationsScreen === 'purchaseSuccess' ? 'justify-start' : 'justify-between'} items-start gap-[5rem]`}>
                <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
                    {showCongratulationsScreen === 'purchaseSuccess' ?
                        <>
                            <img src="/assets/congratulations2.svg" alt="" />
                            <p className='text-xl text-[#B1B1B1] text-center'>You just unlocked <span className='text-green'>{description}</span> coupon</p>
                        </> :
                        <div className='w-full flex flex-col justify-center items-center gap-3 text-[#B1B1B1]'>
                            <h3 className='text-3xl text-[#FA5757]font-semibold'>Some Error Occured!</h3>
                            <p className='text-sm'>Don't worry your movecoins has not been deducted</p>
                        </div>
                    }
                </div>
                {showCongratulationsScreen === 'purchaseSuccess' &&
                    <>
                        <div className='flex flex-col justify-center items-start gap-5'>
                            <NextSteps>Next Steps..</NextSteps>
                            <p className='text-md text-[#B1B1B1] font-extralight'>Present this code to the team to avail your discount</p>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-1'>
                            <div className='w-full h-fit flex flex-row justify-center items-center py-3 rounded-lg border-[1px] border-[#7E87EF87]'>
                                <p className='text-xl font-extrabold'>{purchaseData?.redeemCode}</p>
                            </div>
                            <p className='text-xs text-[#B1B1B1] font-light'>This code will expire on {formatDate(purchaseData?.expiryDate, false)}</p>
                        </div>
                    </>}
                <div className='w-full h-fit grow flex flex-col justify-end items-center gap-5'>
                    {showCongratulationsScreen === 'purchaseSuccess' && <GradientText>Keep crushing your workouts to unlock more offers and discounts</GradientText>}
                    <Button text="Done" action={() => setShowCongratulationsScreen('')} />
                </div>
            </div>
        )
    }
    const PopUp = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }} // Initial animation properties
                animate={{ opacity: 1, y: 0 }} // Animation properties when pop-up is visible
                exit={{ opacity: 0, y: -20 }} // Animation properties when pop-up is hidden
                transition={{ duration: 0.3 }} // Animation duration
                className='w-full h-fit py-5 rounded-b-md bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center gap-3 fixed bottom-0 left-0'
            >
                <p className='text-xl font-medium text-center text-gray-500'>{
                    coins < coinsRequired ? 'You do not have enough coins to avail this offer' : `Are you sure you want to buy this offer for ${coinsRequired} Movecoins?`
                }</p>
                {coins >= coinsRequired && <p className="text-green text-sm">Current Balance : {coins} Movecoins</p>}
                {coins >= coinsRequired && <p className='text-sm text-[#D6B6F0]'>Once you buy, you cannot reverse this action.</p>}
                {coins >= coinsRequired ?
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Buy" action={buyOffer} />
                        <Button text="Cancel" action={() => setShowPopUp(false)} />
                        {/* <div className='bg-green py-1 px-4 rounded-md' onClick={buyOffer}>YES</div>
                        <div className='bg-red py-1 px-4 rounded-md' onClick={() => setShowPopUp(false)}>NO</div> */}
                    </div> :
                    <div className="w-full px-3 flex flex-col justify-around items-center gap-2">
                        <Button text="Close" action={() => setShowPopUp(false)} />
                    </div>}
                <div ref={popUpRef}></div>
            </motion.div>
        )
    }

    return (
        <div>
            <div className={`w-[171px] min-h-[133px] border-[0.5px] border-[#383838] rounded-[12px] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2 flex flex-col justify-start items-start gap-2 ${isAvailable ? 'opacity-1' : 'opacity-[0.5]'}`} onClick={() => setShowPopUp(true)}>
                <StatusTagText className='bg-[#F5C563] w-fit p-[2px] rounded-sm'>{statusTag}</StatusTagText>
                <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
                <DiscountTag>{discountValue}</DiscountTag>
                <DiscountDescription>{description}</DiscountDescription>
            </div>
            {/* AnimatePresence to handle exit animations */}
            <AnimatePresence>
                {showPopUp && <div className='h-full w-full bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-[50]'><PopUp /></div>}
            </AnimatePresence>
            <AnimatePresence>
                {showCongratulationsScreen !== '' && purchaseData  && <div className='h-full w-full bg-black fixed top-0 left-0 z-[50] overflow-y-scroll'><CongratulationsScreen /></div>}
            </AnimatePresence>
        </div>
    )
}

export default OfferTile;
