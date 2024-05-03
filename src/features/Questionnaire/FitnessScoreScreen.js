import React, { useState, useEffect } from 'react'
import { Button } from '../../components';
import { motion } from 'framer-motion';
import { axiosClient } from '../LifestyleQuiz';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components';
import BackButton from '../../components/BackButton';
import { useTagAndColor } from '../../hooks/useTagAndColor';
import FitnessLoader from './FitnessLoader';
import styled from 'styled-components'
import { red } from '@mui/material/colors';

const HorizontalBar = styled.div`
    --color: ${props => props.color};
    width: 40px;
    height: 15px;
    border-radius: 5px;
    background: var(--color);
`;

const TagText = styled.p`
    color: #000;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: normal;
    letter-spacing: -0.36px;
    text-transform: capitalize;
`

function FitnessScorePage() {
    const [name, setName] = useState(null);
    const [data, setData] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState(false);
    const navigate = useNavigate();

    function getFitnessScore(email) {
        setPageLoading(true);
        axiosClient.get(`/signup/snapshot?email=${email}`)
            .then(res => {
                console.log(res);
                setData(res?.data);
            })
            .catch(err => {
                setPageError(true);
                console.log(err)
            })
            .finally(() => {
                setTimeout(() => {
                    setPageLoading(false);
                }, 1000)
            })
    }
    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user['email'];
            const name = user['name']
            setName(name);
            getFitnessScore(email);
        } catch (err) {
            console.log("error in the useEffect block : ", err);
        }
    }, [])

    // Indicator component
    const Indicator = ({ style }) => {
        return (
            <div style={style} className='relative'>
                <div className='w-[2px] h-[15px] bg-white'></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 2 2" className='absolute bottom-0 left-[-3px]'>
                    <polygon points="0,2 1,0 2,2" fill="white" />
                </svg>
            </div>
        )
    }

    // Score Indicator component
    const ScoreIndicator = ({ score }) => {
        const [tag, color, position, colors, tags] = useTagAndColor(score, 40)
        return (
            <div className='w-full flex flex-row justify-between items-center px-3'>
                <div className='text-[60px]' style={{ fontWeight: 400, lineHeight: '54px', fontFamily: 'Anton', color: color }}>{score}</div>
                <div className='w-fit flex flex-col items-start justify-center gap-4'>
                    <div style={{ backgroundColor: color }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
                        <TagText>{tag}</TagText>
                    </div>

                    <div className='w-fit relative'>
                        <Indicator style={{ position: 'absolute', left: `${position}px`, top: '10px' }} />
                        <div className='w-fit flex flex-row justify-center items-center gap-[1px]'>
                            {
                                [...Array(5)].map((_, index) => {
                                    return (
                                        <HorizontalBar color={colors[index]} key={Math.random() * 1000} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {pageLoading && <FitnessLoader />}
            {pageError && !pageLoading && <Error>Some Error Occured</Error>}
            {!pageLoading && !pageError &&
                <div className='w-full h-screen flex flex-col justify-between px-6 py-9 z-50 bg-black bg-no-repeat bg-auto bg-center bg-fixed' style={{ backgroundImage: `url('/assets/fitness_score_gradient.svg')` }}>
                    <div className='w-full flex flex-col justify-start items-start gap-4'>
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className="mx-auto my-4 flex w-full items-center justify-center">
                                <BackButton
                                    size={30}
                                    action={() => {
                                        navigate('/questionnaire')
                                    }}
                                    className="absolute left-[5%] w-fit cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-start items-start gap-9'>
                            {/* Name */}
                            <div className='w-full flex flex-row justify-start items-center gap-3'>
                                <motion.h1
                                    className='text-[32px]'
                                    animate={{
                                        rotate: [0, 10, -10, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: 'easeInOut',
                                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                                        repeat: Infinity
                                    }}
                                >
                                    👋
                                </motion.h1>
                                <h1 className='text-[32px] text-[#848CE9]'>
                                    Hi, {name}
                                </h1>
                            </div>
                            {/* Fitness Score */}
                            <div className='w-full flex flex-col items-start justify-center gap-4'>
                                <p className="text-[16px] text-[#b1b1b1]" style={{ fontWeight: 400, lineHeight: '22px' }}>your fitness score is</p>
                                {data?.fitnessScore && <ScoreIndicator score={data?.fitnessScore} />}
                                <p className='text-[16px] text-[#b1b1b1]' style={{ fontWeight: 400, lineHeight: '22px' }}>You are already better than {data?.fitnessPercentile}% of the OTM community</p>
                            </div>
                            {/* Personalised Workout */}
                            <div className="w-full flex flex-col justify-center items-start gap-3 overflow-y-scroll" >
                                <h1 className='text-[32px] text-[#7e87ef]' style={{ lineHeight: '40px' }}>Your personalised workout</h1>
                                <div className='text-[16px] text-[#b1b1b1] flex flex-col gap-3' style={{ lineHeight: '22px', fontWeight: 400, }} >
                                    {
                                        data?.workout.map((item, index) => {
                                            if(item?.description){
                                                return (
                                                    <p key={index} ><span className='text-[#848CE9]' style={{fontWeight: 800}}>{item?.name}</span> - {item?.description}</p>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start items-center gap-2 mt-9 pb-9">
                        <p className='text-[#5ecc7b] text-[14px] '>It’s a journey, we emphasise on longterm lifestyle changes instead of quick fixes</p>
                        <motion.button
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-full'
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            <Button text={"Go to my Dashboard"} type="lifestyle" />
                        </motion.button>
                    </div>
                </div>
            }
        </>
    )
}

export default FitnessScorePage