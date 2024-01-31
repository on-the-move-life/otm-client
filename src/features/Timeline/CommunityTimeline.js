import React, { useEffect, useState, useRef } from 'react'
import TimelineTile from './TimelineTile'
import Loader from '../../components/Loader';

function CommunityTimeline() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const timelineTopRef = useRef();

    function scrollToTop(){
        timelineTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/timeline?type=community&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setData(prev => data);
                setLoading(false);
                scrollToTop()
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [page])
    return (
        <div className='w-full h-screen flex flex-col justify-start itmes-center gap-5 mt-3 overflow-y-scroll pb-[50px]'>
            {
                loading &&
                <div className="h-full fixed z-50 bg-black">
                    <Loader />
                </div>
            }

            {
                data?.data && data?.data.map((data, index) => {
                    if(index === 0){
                        return(
                            <div ref={timelineTopRef}>
                                <TimelineTile name={data?.name} dateTime={data?.time} currScore={data?.fitnessScoreUpdates?.newScore} prevScore={data?.fitnessScoreUpdates?.oldScore} sectionPerformance={data?.sectionPerformance} key={index}/>
                            </div>
                        )
                    }
                    return (
                        <TimelineTile name={data?.name} dateTime={data?.time} currScore={data?.fitnessScoreUpdates?.newScore} prevScore={data?.fitnessScoreUpdates?.oldScore} sectionPerformance={data?.sectionPerformance} key={index} />
                    )
                })
            }

            <div className='fixed bottom-0 left-0 w-full h-[50px] bg-white/10 backdrop-blur-sm flex flex-row justify-center items-center gap-5 p-2'>
                <p className={`w-full text-left text-xl ${page > 1 ? 'text-green' : 'text-green/50'}`} onClick={() => {
                    page > 1 && setPage(prev => prev - 1);
                }}>{'<Back'}</p>
                <div className='w-full text-center text-sm text-white/90'>Page {page}</div>
                <p className={`w-full text-right text-xl ${data?.hasNextPage ? 'text-green' : 'text-green/50'}`} onClick={() => {
                    data?.hasNextPage && setPage(prev => prev + 1);
                }}>{'Next>'}</p>
            </div>
        </div>
    )
}

export default CommunityTimeline