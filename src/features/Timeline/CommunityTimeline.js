import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import TimelineTile from './TimelineTile';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from 'react-icons/hi';
import { axiosClient } from './apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimelineCommunityDetails } from '../../store/actions/timeline.action';

function CommunityTimeline() {
  const [page, setPage] = useState(1);
  const [isError, setError] = useState(false);
  const timelineTopRef = useRef();
  const getTimeline = useSelector((state) => state.timeline);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  // function to always take the user to the top of the page after a new page is loaded
  function scrollToTop() {
    timelineTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // function to fetch the data from the server
  useEffect(() => {
    if (getTimeline?.communityDetail === null || page > 1) {
      dispatch(
        fetchTimelineCommunityDetails({
          user,
          page,
          type: 'personal',
        }),
      );
    }

    scrollToTop();
  }, [page]);

  return (
    <div className="itmes-center hide-scrollbar mt-3 flex h-screen w-full flex-col justify-start gap-12 overflow-y-scroll pb-[50px]">
      {isError && (
        <Error className={'w-full'}>Oops! Something went wrong...</Error>
      )}
      {getTimeline?.communityLoading && (
        <div className="fixed left-0 z-50 h-[83%] w-full bg-black">
          <Loader className={'h-full'} />
        </div>
      )}

      {getTimeline?.communityDetail?.data &&
        getTimeline?.communityDetail?.data?.length !== 0 &&
        getTimeline?.communityDetail?.data.map((data, index) => {
          if (index === 0) {
            return (
              <motion.div
                key={data?._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div ref={timelineTopRef}>
                  <TimelineTile data={data} />
                </div>
              </motion.div>
            );
          }
          return (
            <motion.div
              key={data?._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TimelineTile data={data} />
            </motion.div>
          );
        })}
      {!getTimeline?.communityLoading &&
        !isError &&
        getTimeline?.communityDetail?.data &&
        getTimeline?.communityDetail?.data?.length === 0 && (
          <div className="h-screen">
            <h1 className="mt-10 text-center text-2xl text-white/90">
              No workout data yet
            </h1>
          </div>
        )}

      {!getTimeline?.communityLoading &&
        !isError &&
        getTimeline?.communityDetail?.data &&
        getTimeline?.communityDetail?.data?.length !== 0 && (
          <motion.div
            className="fixed bottom-0 left-0 flex h-[50px] w-full flex-row items-center justify-center gap-5 bg-white/10 p-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`flex w-full flex-row items-center justify-start ${
                page > 1 ? 'text-green' : 'text-green/50'
              }`}
              onClick={() => {
                page > 1 && setPage((prev) => prev - 1);
              }}
            >
              <HiOutlineChevronDoubleLeft size={30} />
            </div>
            <div className="w-full text-center text-sm text-white/90">
              Page {page}
            </div>
            <div
              className={`flex w-full flex-row items-center justify-end ${
                getTimeline?.communityDetail?.hasNextPage
                  ? 'text-green'
                  : 'text-green/50'
              }`}
              onClick={() => {
                getTimeline?.communityDetail?.hasNextPage &&
                  setPage((prev) => prev + 1);
              }}
            >
              <HiOutlineChevronDoubleRight size={30} />
            </div>
          </motion.div>
        )}
    </div>
  );
}

export default CommunityTimeline;
