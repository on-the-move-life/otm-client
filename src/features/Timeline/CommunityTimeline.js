import React, { useEffect, useState, useRef } from 'react'
import TimelineTile from './TimelineTile'
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";
import { axiosClient } from './apiClient';

function CommunityTimeline() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isError, setError] = useState(false);
    const timelineTopRef = useRef();

    // function to always take the user to the top of the page after a new page is loaded
    function scrollToTop() {
        timelineTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // function to fetch the data from the server
    const fetchData = async () => {
        const email = JSON.parse(localStorage.getItem('user'))?.email;
        setLoading(prev => true);
        try {
            const res = await axiosClient.get(`?type=community&page=${page}&email=${email}`);
            setData(prev => res?.data);
            setLoading(false);
            scrollToTop()
        } catch (err) {
            setError(true);
            setLoading(false);
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page])

    return (
        <div className='w-full h-screen flex flex-col justify-start itmes-center gap-12 mt-3 overflow-y-scroll pb-[50px]'>
            {isError && <Error className={'w-full'}>Oops! Something went wrong...</Error>}
            {
                loading &&
                <div className="w-full h-[83%] fixed left-0 z-50 bg-black">
                    <Loader className={'h-full'} />
                </div>
            }

            {
                data?.data && data?.data?.length !== 0 && data?.data.map((data, index) => {
                    if (index === 0) {
                        return (
                            <div ref={timelineTopRef} key={data?._id}>
                                <TimelineTile data={data} />
                            </div>
                        )
                    }
                    return (
                        <TimelineTile data={data} key={data?._id}/>
                    )
                })
            }
            {
                !loading && !isError && data?.data && data?.data?.length === 0 &&
                <div className='h-screen'>
                    <h1 className='text-white/90 text-center text-2xl mt-10'>No workout data yet</h1>
                </div>
            }

            {!loading && !isError && data?.data && data?.data?.length !== 0 && <div className='fixed bottom-0 left-0 w-full h-[50px] bg-white/10 backdrop-blur-sm flex flex-row justify-center items-center gap-5 p-2'>
                <div className={`w-full flex flex-row justify-start items-center ${page > 1 ? 'text-green' : 'text-green/50'}`} onClick={() => {
                    page > 1 && setPage(prev => prev - 1);
                }}><HiOutlineChevronDoubleLeft size={30} /></div>
                <div className='w-full text-center text-sm text-white/90'>Page {page}</div>
                <div className={`w-full flex flex-row justify-end items-center ${data?.hasNextPage ? 'text-green' : 'text-green/50'}`} onClick={() => {
                    data?.hasNextPage && setPage(prev => prev + 1);
                }}><HiOutlineChevronDoubleRight size={30} /></div>
            </div>}
        </div>
    )
}

export default CommunityTimeline