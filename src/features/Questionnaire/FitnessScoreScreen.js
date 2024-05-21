import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '../../components';
import { motion } from 'framer-motion';
import { axiosClient } from '../LifestyleQuiz';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components';
import BackButton from '../../components/BackButton';
import { useTagAndColor } from '../../hooks/useTagAndColor';
import FitnessLoader from './FitnessLoader';
import styled from 'styled-components'

const HorizontalBar = styled.div`
    --color: ${props => props.color};
    width: 40px;
    height: 7.7px;
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

    // function to determine if the devive is iPhone or not
    const isIPhone = () => {
        const userAgent = navigator.userAgent;
        console.log("user agent : ", userAgent.includes('iPhone'));
        return userAgent.includes('iPhone');
      };

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
                <div className='w-[2px] h-[12px] bg-white'></div>
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
            <div className='w-full flex flex-col justify-start items-center gap-2 rounded-t-[12px] bg-[#1c1c1e]'>
                <div className='w-full rounded-t-[12px] bg-[#7e87ef]'>
                    <p className='text-[15px] text-[#1f1f1f] ml-3' style={{fontWeight: 600}}>Your Fitness Insights</p>
                </div>
                <div className='w-full flex flex-row justify-between items-center px-3' style={{ marginBlock: '8px' }}>
                    <div className='flex flex-col justify-center items-start gap-1'>
                        <p className='text-[#929292] text-[9.3px] uppercase' style={{ fontWeight: 500 }}>Score</p>
                        <div className='text-[60px]' style={{ fontWeight: 400, lineHeight: '54px', fontFamily: 'Anton', color: color }}>{score}</div>
                    </div>
                    <div className='w-fit flex flex-col items-start justify-center gap-4'>
                        <div className='flex flex-col justify-center items-start gap-1'>
                            <p className='text-[#929292] text-[9.3px] uppercase' style={{ fontWeight: 500 }}>Fitness Level</p>
                            <div style={{ backgroundColor: color }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
                                <TagText>{tag}</TagText>
                            </div>
                        </div>

                        <div className='w-fit relative'>
                            <Indicator style={{ position: 'absolute', left: `${position}px`, top: '3px' }} />
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
            </div>
        )
    }
    // personalised workout component
    const PersonalisedWorkout = ({heading, detail, index}) => {
        const colors = useMemo(() => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'], []);
        const headingColor = colors[(index % colors.length)];
        return(
            <div className='min-w-[300px] flex flex-col justify-start items-start gap-[2px]'>
                <div className='w-full bg-[#1c1c1e] px-3 py-2 rounded-t-[12px]'>
                    <h1 className='text-[15px]' style={{fontWeight: 600, color: headingColor}}>{heading}</h1>
                </div>
                <div className='w-full bg-[#1c1c1e] p-3 rounded-b-[12px]'>
                    <p className='text-[14px] text-[#fff]' style={{fontWeight: 500}}>{detail}</p>
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
                        {/* <div className="flex flex-col items-center justify-center gap-5">
                            <div className="mx-auto my-4 flex w-full items-center justify-center">
                                <BackButton
                                    size={30}
                                    action={() => {
                                        navigate('/questionnaire')
                                    }}
                                    className="absolute left-[5%] w-fit cursor-pointer"
                                />
                            </div>
                        </div> */}
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
                            <div className='w-full flex flex-col items-start justify-center gap-[3px]'>
                                {data?.fitnessScore && <ScoreIndicator score={data?.fitnessScore} />}
                                <div className='bg-[#1c1c1e] py-2 px-3 rounded-b-[12px]'>
                                    <p className='text-[16px] text-[#fff]' style={{ fontWeight: 400, lineHeight: '22px' }}>You are already better than {data?.fitnessPercentile}% of the OTM community</p>
                                </div>
                            </div>
                            {/* Personalised Workout */}
                            <div className="w-full flex flex-col justify-center items-start" >
                                <h1 className='text-[25.33px] text-[#7e87ef]' style={{ lineHeight: '40px', marginBlock: '10px' }}>Your personalised workout</h1>
                                <div className='w-full flex flex-row gap-5 overflow-x-scroll hide-scrollbar'>
                                    {
                                        data?.workout.map((item, index) => {
                                            if (item?.description) {
                                                return (
                                                    <PersonalisedWorkout heading={item?.name} detail={item?.description} index={index} key={item?.name}/>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start items-center gap-2 mt-9" style={{paddingBottom: isIPhone() ? '100px' : '20px'}}>
                        <p className='text-[#5ecc7b] text-[16px] ' style={{fontWeight: 500, lineHeight: '22px', textShadow: '0px 3px 3px rgba(0,0,0,0.15)'}}>It’s a journey, we emphasise on longterm lifestyle changes instead of quick fixes</p>
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