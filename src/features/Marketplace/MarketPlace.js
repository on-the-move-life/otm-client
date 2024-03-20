import React, { useState, useEffect } from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { MarketPlaceHeading, Name, OffersTitle } from './StyledComponents';
import Movecoins from './Movecoins';
import CoinsIndicator from './CoinsIndicator';
import OfferTile from './OfferTile';
import PurchaseTile from './PurchaseTile';
import AnimatedComponent from '../../components/AnimatedComponent';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { axiosClient } from './apiClient';

function MarketPlace() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [purchaseData, setPurchaseData] = useState(null);

    function fetchAndStoreData() {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user'));
        axiosClient.get(`/marketplace?member=${userData?.code}`)
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data);
                setPurchaseData(res.data.data.purchases);
                setName(userData?.name)
            })
            .catch(err => {
                setError(true);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchAndStoreData();
    }, [])
    return (
        <AnimatedComponent>
            {loading && <Loader className={'h-screen fixed left-0 top-0 z-[200] bg-black'} />}
            {error && <Error className={'w-screen fixed left-0 top-0 z-[200] bg-black'}>Something went wrong. Please try again later.</Error>}
            {data && <div className="flex min-h-screen w-screen flex-col px-4 py-4 hide-scrollbar">
                <div className="mb-4">
                    <HiArrowNarrowLeft
                        size={20}
                        onClick={() => {
                            navigate('/home');
                        }}
                    />
                </div>
                <div className='w-full flex flex-row justify-between items-center mb-3'>
                    <MarketPlaceHeading>OTM Marketplace</MarketPlaceHeading>
                </div>
                <div className='w-full min-h-[210px] border-[0.5px] border-[#383838] rounded-[12px] bg-gradient-to-b from-[#171717] to-[#0F0F0F] my-2 flex flex-col justify-start items-center gap-7'>
                    <div
                        className='w-full px-3 flex flex-col justify-center items-start bg-no-repeat bg-right-top py-2'
                        style={{ backgroundImage: `url(${'/assets/Marketplace_bgcoins.svg'})` }}
                    >
                        <Name>Hello {name},</Name>
                        <Movecoins fontSize={'26px'} coins={data?.moveCoins} />
                    </div>
                    <div className='w-full mt-2'>
                        <CoinsIndicator coins={data?.moveCoins} offers={data?.offers} />
                    </div>
                </div>
                <div className='w-full my-2'>
                    <OffersTitle>My Offers</OffersTitle>
                    <div className='w-full flex flex-row justify-start items-center gap-5 my-2 overflow-x-scroll hide-scrollbar' >
                        {
                            data?.offers && data?.offers.map((offer, index) => {
                                return (
                                    <OfferTile
                                        key={offer?._id}
                                        offerId={offer._id}
                                        coins={data.moveCoins}
                                        coinsRequired={offer.requiredMovecoins}
                                        type={offer.type}
                                        description={offer.description}
                                        isAvailable={offer.isAvailable}
                                        statusTag={offer.availabilityStatus}
                                        discountValue={offer.value}
                                        setTotalPurchaseData={setPurchaseData}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className='w-full my-2'>
                    <OffersTitle>My Purchases</OffersTitle>
                    <div className='w-full flex flex-row justify-start items-center gap-5 my-2 overflow-x-scroll hide-scrollbar'>
                        {
                            purchaseData && purchaseData?.map((purchase, index) => {
                                return (
                                    <PurchaseTile
                                        key={purchase?._id}
                                        purchaseId={purchase._id}
                                        coinsRequired={purchase.requiredMovecoins}
                                        description={purchase.description}
                                        purchaseDate={purchase.purchaseDate}
                                        expiryDate={purchase.expiryDate}
                                        isRedeemed={purchase.isRedeemed}
                                        redeemCode={purchase.redeemCode}
                                        redeemDate={purchase.redemptionDate}
                                        value={purchase.value}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>}
        </AnimatedComponent>
    )
}

export default MarketPlace