import React from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { MarketPlaceHeading, Name } from './StyledComponents';
import Movecoins from './Movecoins';
import CoinsIndicator from './CoinsIndicator';

function MarketPlace({ 
    name = "Vrinda",
    coins = "4,200",
}) {
    const navigate = useNavigate();
    return (
        <div className="flex h-screen w-screen flex-col px-4 py-4 hide-scrollbar">
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
                    <Movecoins fontSize={'26px'} coins={coins}/>
                </div>
                <div className='w-full mt-2'>
                    <CoinsIndicator />
                </div>
            </div>
            
        </div>
    )
}

export default MarketPlace