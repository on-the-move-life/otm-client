import React, { useEffect, useState, useRef } from 'react'
import TimelineTile from './TimelineTile'
import Loader from '../../components/Loader';
import axios from 'axios';
import Error from '../../components/Error';
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";

function PersonalTimeline() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const timelineTopRef = useRef();
    const [isError, setError] = useState(false);

    function scrollToTop() {
        timelineTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        console.log(userData?.data)
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/timeline?type=personal&name=${user?.name}&page=${page}`)
            .then(res => {
                setUserData(prev => res?.data);
                setLoading(false);
                scrollToTop()
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err);
            })
    }, [page])
    return (
        <div className='w-full h-screen flex flex-col justify-start itmes-center gap-5 mt-3 overflow-y-scroll pb-[50px]'>
            {isError && <Error>Oops! Something went wrong...</Error>}
            {
                loading &&
                <div className="w-full h-[80%] fixed left-0 z-50 bg-black">
                    <Loader className={'h-full'}/>
                </div>
            }

            {
                userData?.data && userData?.data?.length !== 0 ? userData?.data.map((data, index) => {
                    if (index === 0) {
                        return (
                            <div ref={timelineTopRef} key={Math.random() * 1000}>
                                <TimelineTile
                                    name={data?.name}
                                    dateTime={data?.time}
                                    currScore={data?.fitnessScoreUpdates?.newScore}
                                    prevScore={data?.fitnessScoreUpdates?.oldScore}
                                    sectionPerformance={data?.sectionPerformance}
                                    coachNotes={data?.coachNotes}
                                    achievement={data?.achievement}
                                />
                            </div>
                        )
                    }
                    return (
                        <TimelineTile
                            name={data?.name}
                            dateTime={data?.time}
                            currScore={data?.fitnessScoreUpdates?.newScore}
                            prevScore={data?.fitnessScoreUpdates?.oldScore}
                            sectionPerformance={data?.sectionPerformance}
                            key={Math.random() * 1000}
                            coachNotes={data?.coachNotes}
                            achievement={data?.achievement}
                        />
                    )
                }) :
                    <div className='h-screen'>
                        <h1 className='text-white/90 text-center text-2xl mt-10'>No workout data yet</h1>
                    </div>
            }

            {userData?.data && userData?.data.length !== 0 && <div className='fixed bottom-0 left-0 w-full h-[50px] bg-white/10 backdrop-blur-sm flex flex-row justify-center items-center gap-5 p-2'>
                <div className={`w-full flex flex-row justify-start items-center ${page > 1 ? 'text-green' : 'text-green/50'}`} onClick={() => {
                    page > 1 && setPage(prev => prev - 1);
                }}><HiOutlineChevronDoubleLeft size={30} /></div>
                <div className='w-full text-center text-sm text-white/90'>Page {page}</div>
                <div className={`w-full flex flex-row justify-end items-center ${userData?.hasNextPage ? 'text-green' : 'text-green/50'}`} onClick={() => {
                    userData?.hasNextPage && setPage(prev => prev + 1);
                }}><HiOutlineChevronDoubleRight size={30} /></div>
            </div>}
        </div>
    )
}

export default PersonalTimeline