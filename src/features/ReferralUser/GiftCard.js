import { useEffect, useState } from 'react';

const GiftCard = ({ info, subscriptionText }) => {
  const [isSvgLoaded, setIsSvgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = './assets/gifts-big.svg';
    img.onload = () => setIsSvgLoaded(true);
  }, []);

  return (
    <>
      {isSvgLoaded === true ? (
        <div
          style={{
            marginBlock: '32px',
            background:
              'linear-gradient(135deg, #9BA1E9 0%, #D3C2D6 50%, #9BA1E9 100%)',
            boxShadow:
              '0 0 10px 5px rgba(155, 161, 233, 0.2), 0 0 20px 10px rgba(155, 161, 233, 0.2), 0 0 30px 15px rgba(155, 161, 233, 0.2)',
          }}
          className="relative flex min-h-[172px] max-w-[350px] overflow-hidden rounded-lg pb-2 pr-2"
        >
          <img
            className="relative -bottom-2"
            src="./assets/gifts-big.svg"
            alt=""
          />
          <div className="flex flex-col gap-3 mt-5 mb-2">
            <img
              src="./assets/otm-blue.svg"
              className="h-[13px] w-min"
              alt=""
            />
            <h2 className="font-sfpro text-[20px] font-medium leading-6 text-[#3F4A8D]">
              {info}
            </h2>
            <h3 className="font-sfpro text-[14px] font-medium leading-4 text-[#3F4A8D]/[0.6] ">
              {subscriptionText}
            </h3>
          </div>
        </div>
      ) : (
        <div className="mt-8 h-[172px] w-[350px] animate-pulse rounded-xl bg-mediumGray"></div>
      )}
    </>
  );
};

export default GiftCard;
