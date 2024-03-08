import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import TimelineTile from './TimelineTile';
import Loader from '../../components/Loader';
import { axiosClient } from './apiClient';
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
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        axiosClient.get(`?type=personal&name=${user?.name}&page=${page}&email=${user?.email}`)
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
    }, [page]);

    return (
        <motion.div
            className='w-full h-screen flex flex-col justify-start items-center gap-5 mt-3 overflow-y-scroll pb-[50px] hide-scrollbar'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {isError && <Error className={'w-full'}>Oops! Something went wrong...</Error>}
            {loading &&
                <div className="w-full h-[83%] fixed left-0 z-50 bg-black">
                    <Loader className={'h-full'} />
                </div>
            }
            {userData?.data && userData?.data?.length !== 0 && userData?.data?.map((data, index) => (
                <motion.div
                    key={data?._id}
                    ref={index === 0 ? timelineTopRef : null}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='w-full h-fit'
                >
                    <TimelineTile data={data} />
                </motion.div>
            ))}
            {!loading && !isError && userData?.data?.length === 0 &&
                <div className='h-screen'>
                    <h1 className='text-white/90 text-center text-2xl mt-10'>No workout data yet</h1>
                </div>
            }
            {!loading && !isError && userData?.data?.length !== 0 &&
                <motion.div
                    className='fixed bottom-0 left-0 w-full h-[50px] bg-white/10 flex flex-row justify-center items-center gap-5 p-2'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className={`w-full flex flex-row justify-start items-center ${page > 1 ? 'text-green' : 'text-green/50'}`}
                        onClick={() => page > 1 && setPage(prev => prev - 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <HiOutlineChevronDoubleLeft size={30} />
                    </motion.div>
                    <div className='w-full text-center text-sm text-white/90'>Page {page}</div>
                    <motion.div
                        className={`w-full flex flex-row justify-end items-center ${userData?.hasNextPage ? 'text-green' : 'text-green/50'}`}
                        onClick={() => userData?.hasNextPage && setPage(prev => prev + 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <HiOutlineChevronDoubleRight size={30} />
                    </motion.div>
                </motion.div>
            }
        </motion.div>
    );
}

export default PersonalTimeline;
