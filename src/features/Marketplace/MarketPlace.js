import React, { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';

function MarketPlace() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [purchaseData, setPurchaseData] = useState(null);

  console.log(data?.moveCoins);

  // for animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  function fetchAndStoreData() {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem('user'));
    axiosClient
      .get(`/marketplace?member=${userData?.code}`)
      .then((res) => {
        setData(res.data.data);
        setPurchaseData(res.data.data.purchases);
        setName(userData?.name);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchAndStoreData();
  }, []);
  return (
    <>
      {loading && (
        <Loader className={'fixed left-0 top-0 z-[200] h-screen bg-black'} />
      )}
      {error && (
        <Error className={'fixed left-0 top-0 z-[200] w-screen bg-black'}>
          Something went wrong. Please try again later.
        </Error>
      )}
      {data && !loading && !error && (
        <div className="hide-scrollbar flex min-h-screen w-screen flex-col px-4 py-4">
          <div className="mb-4">
            <HiArrowNarrowLeft
              size={20}
              onClick={() => {
                navigate('/profile');
              }}
            />
          </div>
          <div className="mb-3 flex w-full flex-row items-center justify-between">
            <MarketPlaceHeading>OTM Marketplace</MarketPlaceHeading>
          </div>
          <AnimatedComponent>
            <div className="my-2 flex min-h-[210px] w-full flex-col items-center justify-start gap-7 rounded-[12px] border-[0.5px] border-[#383838] bg-gradient-to-b from-[#171717] to-[#0F0F0F]">
              <div
                className="flex w-full flex-col items-start justify-center bg-right-top bg-no-repeat px-3 py-2"
                style={{
                  backgroundImage: `url(${'/assets/Marketplace_bgcoins.svg'})`,
                }}
              >
                <Name>Hello {name},</Name>
                <Movecoins fontSize={'26px'} coins={300} />
              </div>
              <div className="mt-2 w-full">
                <CoinsIndicator coins={300} offers={[]} />
              </div>
            </div>
          </AnimatedComponent>
          <div className="my-2 w-full">
            <OffersTitle>My Offers</OffersTitle>
            <motion.div
              className="hide-scrollbar my-2 flex w-full flex-row items-center justify-start gap-5 overflow-x-scroll"
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {data?.offers &&
                data?.offers.map((offer, index) => {
                  return (
                    <motion.div variants={item} key={offer?._id}>
                      <OfferTile
                        offerId={offer._id}
                        coins={data.moveCoins}
                        coinsRequired={offer.requiredMovecoins}
                        type={offer.type}
                        description={offer.description}
                        isAvailable={offer.isAvailable}
                        statusTag={offer.availabilityStatus}
                        discountValue={offer.value}
                        setTotalPurchaseData={setPurchaseData}
                        setData={setData}
                      />
                    </motion.div>
                  );
                })}
            </motion.div>
          </div>
          <div className="my-2 w-full">
            <OffersTitle>My Purchases</OffersTitle>
            <motion.div
              className="hide-scrollbar my-2 flex w-full flex-row items-center justify-start gap-5 overflow-x-scroll"
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {purchaseData &&
                purchaseData.length !== 0 &&
                purchaseData?.map((purchase, index) => {
                  return (
                    <motion.div variants={item} key={purchase?._id}>
                      <PurchaseTile
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
                    </motion.div>
                  );
                })}
              {purchaseData && purchaseData.length === 0 && (
                <div className="my-2 flex w-full flex-row items-center justify-center text-[#545454]">
                  No Offers Purchased Yet!
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export default MarketPlace;
