import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import AlertDialog from './AlertDialog';
import { updateSectionWorkout, setMovementSwapSectionStatus } from './WorkoutSlice.js';

function SwapMovementOptions({ setShowSwapOptions, sectionCode }) {
    const [movementsList, setMovementsList] = useState(null);
    const [equipments, setEquipments] = useState([]);
    const [currentEquipment, setCurrentEquipment] = useState('');
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [selectedMovementInfo, setSelectedMovementInfo] = useState(null);
    const [alertMessage, setAlertMessage] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedMovementDetail, setSelectedMovementDetail] = useState(null);
    const dispatch = useDispatch();
    const { swapMovementsList, status, oldSwapMovementCode, workoutId, swapMovementSectionStatus } = useSelector(store => store.workoutReducer);

    useEffect(() => {
        // reset to default empty status on first load
        dispatch(setMovementSwapSectionStatus(''));
    }, [])

    useEffect(() => {
        // console.log("movementsList and equipments : ", movementsList, equipments);

        setEquipments(prev => getListOfEquipments());
        // initially save all the movements to the movements list,
        setMovementsList(swapMovementsList);
    }, [swapMovementsList])

    useEffect(() => {
        // change the movements list as per user choice
        if (currentEquipment !== '')
            setMovementsList(swapMovementsList.filter(mvmt => mvmt?.equipment.includes(currentEquipment)));
        else
            setMovementsList(swapMovementsList);
    }, [currentEquipment])

    useEffect(() => {
        if (alertMessage) {
            // call the dispatch function to update the workout section
            dispatch(updateSectionWorkout(oldSwapMovementCode, selectedMovementInfo?.code, sectionCode, workoutId));
        }
        setShowAlertDialog(false);
    }, [alertMessage])

    useEffect(() => {
        if (swapMovementSectionStatus === 'success') {
            // reset the status after successful API call and before closing
            dispatch(setMovementSwapSectionStatus(''));
            setShowSwapOptions(false);
        }
    }, [swapMovementSectionStatus])

    function getListOfEquipments() {
        let equipments = new Set();
        swapMovementsList.forEach(movement => {
            movement.equipment.forEach(equip => {
                equipments.add(equip);
            })
        })
        // add the empty string to the set to support 'All' options
        equipments.add('');

        return Array.from(equipments).sort();
    }

    function handleAlertMessage(inputStatus) {
        setAlertMessage(inputStatus);
        setShowAlertDialog(false);
    }

    const MovementTile = ({ mvmt, setSelectedMovementInfo }) => {
        return (
            <div className='w-full h-[85px] rounded-[12px] bg-black flex flex-row justify-between items-center' onClick={() => setSelectedMovementDetail(mvmt)}>
                <div className='w-full h-full flex flex-row justify-start items-center gap-5' onClick={() => setShowDetail(true)}>
                    <img src={mvmt?.link[0]} alt={mvmt?.name} loading='lazy' className='rounded-l-[12px] h-[85px] w-[85px] object-cover' />
                    <div>
                        <h3 className='text-[14px] text-[#fff] capitalize'>{mvmt?.name}</h3>
                        <div className='flex flex-row justify-start items-start gap-2 text-[#b1b1b1] text-[10px] '>
                            <p>{mvmt?.bucket}</p>
                            <p>{mvmt?.section}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-[#5ecc7b] px-3 py-1 text-black rounded-[6px] text-[12px] mr-3' onClick={() => {
                    setShowAlertDialog(true);
                    setSelectedMovementInfo(prev => {
                        return {
                            section: mvmt?.section,
                            code: mvmt?.code
                        }
                    })
                }}>Pick</div>
            </div>
        )
    }

    const MovementDetail = ({ mvmt }) => {
        return (
            <div className='w-full h-screen overflow-y-scroll px-3 pb-4 pt-9 bg-[#1c1c1e] flex flex-col justify-start items-center fixed top-0 left-0 gap-3'>
                <img src={'/assets/close_icon.svg'} alt="close" className='fixed top-3 right-3' onClick={() => {
                    setShowDetail(false);
                    setSelectedMovementDetail(null);
                }} />
                <div className='w-full flex flex-row justify-center items-center gap-1'>
                    <img src={'/assets/information-circle.svg'} alt="information" />
                    <p className='text-[10px] text-[#929292] '>Movement Details</p>
                </div>
                <img src={mvmt?.link[0]} alt={mvmt?.name} height={140} width={120} className='object-cover rounded-[12px]' />
                <h3 className='text-[#fff] text-[20px] capitalize' style={{ lineHeight: '32px' }}>{mvmt?.name}</h3>
                <div className="w-full bg-black rounded-[12px] px-4 py-3 flex flex-col justify-start items-start gap-5">
                    {
                        mvmt?.focus_area.length > 0 && mvmt?.focus_area[0] !== '' &&
                        <div className='w-full flex flex-col justify-center items-start gap-3'>
                            <div className='w-full flex flex-row justify-start items-center gap-1'>
                                <img src={'/assets/search_icon.svg'} alt="search icon" />
                                <h3 className='text-[#7E87EF] text-[14px] capitalize'>Focus Area</h3>
                            </div>
                            <div className='w-full flex flex-row justify-start itmes-center gap-2'>
                                {
                                    mvmt?.focus_area.map((item, index) => {
                                        return (
                                            <div key={item} className='border-[#f8f8f8] border-[0.6px] rounded-[6px] text-[#f8f8f8] px-3 py-1 text-[10px]'>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {
                        mvmt?.equipment.length > 0 && mvmt?.equipment[0] !== '' &&
                        <div className='w-full flex flex-col justify-center items-start gap-3'>
                            <div className='w-full flex flex-row justify-start items-center gap-1'>
                                <img src={'/assets/equipment.svg'} alt="search icon" />
                                <h3 className='text-[#DDF988] text-[14px] capitalize'>Equipment</h3>
                            </div>
                            <div className='w-full flex flex-row justify-start itmes-center gap-2'>
                                {
                                    mvmt?.equipment.map((item, index) => {
                                        return (
                                            <div key={item} className='border-[#f8f8f8] border-[0.6px] rounded-[6px] text-[#f8f8f8] px-3 py-1 text-[10px]'>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className="w-full bg-black rounded-[12px] px-4 py-3 flex flex-col justify-start items-start gap-3">
                    {
                        mvmt?.setup.length > 0 && mvmt?.setup[0] !== '' &&
                        <>
                            <h3 className='text-[20px] text-[#fff] capitalize' style={{ lineHeight: '32px' }}>Setup</h3>
                            <div className='w-full flex flex-col justify-start items-start gap-3'>
                                {
                                    mvmt?.setup.map((item, index) => {
                                        return (
                                            item !== '' &&
                                            <div key={item} className='w-full flex flex-row justify-start items-center gap-2'>
                                                <div className='w-[11px] h-[11px] rounded-full bg-[#7E87EF]'></div>
                                                <p className='text-[14px] text-[#b1b1b1]'>{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
                <div className="w-full bg-black rounded-[12px] px-4 py-3 flex flex-col justify-start items-start gap-3">
                    {
                        mvmt?.execution.length > 0 && mvmt?.execution[0] !== '' &&
                        <>
                            <h3 className='text-[20px] text-[#fff] capitalize' style={{ lineHeight: '32px' }}>Execution</h3>
                            <div className='w-full flex flex-col justify-start items-start gap-3'>
                                {
                                    mvmt?.execution.map((item, index) => {
                                        return (
                                            item !== '' &&
                                            <div key={item} className='w-full flex flex-row justify-start items-center gap-2'>
                                                <div className='w-[11px] h-[11px] rounded-full bg-[#5ECC7B]'></div>
                                                <p className='text-[14px] text-[#b1b1b1]'>{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
                <div className="w-full bg-black rounded-[12px] px-4 py-3 flex flex-col justify-start items-start gap-3">
                    {
                        mvmt?.completion.length > 0 && mvmt?.completion[0] !== '' &&
                        <>
                            <h3 className='text-[20px] text-[#fff] capitalize' style={{ lineHeight: '32px' }}>Completion</h3>
                            <div className='w-full flex flex-col justify-start items-start gap-3'>
                                {
                                    mvmt?.completion.map((item, index) => {
                                        return (
                                            item !== '' &&
                                            <div key={item} className='w-full flex flex-row justify-start items-center gap-2'>
                                                <div className='w-[11px] h-[11px] rounded-full bg-[#F5C563]'></div>
                                                <p className='text-[14px] text-[#b1b1b1]'>{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
                <div className="w-full bg-black rounded-[12px] px-4 py-3 flex flex-col justify-start items-start gap-3">
                    {
                        mvmt?.key_tips.length > 0 && mvmt?.key_tips[0] !== '' &&
                        <>
                            <h3 className='text-[20px] text-[#fff] capitalize' style={{ lineHeight: '32px' }}>Key Tips</h3>
                            <div className='w-full flex flex-col justify-start items-start gap-3'>
                                {
                                    mvmt?.key_tips.map((item, index) => {
                                        return (
                                            item !== '' &&
                                            <div key={item} className='w-full flex flex-row justify-start items-center gap-2'>
                                                <div className='w-[11px] h-[11px] rounded-full bg-[#DDF988]'></div>
                                                <p className='text-[14px] text-[#b1b1b1]'>{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
                <button className='w-full bg-[#7E87EF] text-center py-3 rounded-[12px] text-[#1f1f1f] text-[18px] mb-7 mt-3' style={{letterSpacing: '-0.54px', fontWeight: 590}} onClick={() => {
                    setShowDetail(false);
                    setSelectedMovementDetail(null);
                }}>
                    Back
                </button>
            </div>
        )
    }
    return (
        movementsList &&
        <div className='w-full h-screen hide-scrollbar bg-[#1c1c1e] px-3 py-4 flex flex-col justify-start gap-5'>
            <div className='w-full flex flex-row justify-between items-center'>
                {status === 'success' && <h3 className='text-[20px] text-[#fff] capitalize' style={{ lineHeight: '32px' }}>Pick Alternate Movement</h3>}
                <img src={'/assets/close_icon.svg'} alt="close" onClick={() => setShowSwapOptions(false)} />
            </div>
            {status === 'success' &&
                <div className='w-full flex flex-row flex-wrap justify-start items-center gap-2'>
                    {
                        equipments?.length > 0 && equipments.map(equip => <div key={equip === '' ? 'All' : equip} className={`px-5 py-1.5 text-[10px] rounded-[6px] ${currentEquipment === equip ? 'bg-[#5ecc7b] text-black' : 'bg-black text-[#fff]'}`} onClick={() => setCurrentEquipment(equip)}>{equip === '' ? 'All' : equip}</div>)
                    }
                </div>
            }
            {status === 'success' && !showDetail &&
                <div className='w-full h-full overflow-y-scroll hide-scrollbar flex flex-col justify-start items-start gap-3'>
                    {
                        movementsList?.map(movement => {
                            return (
                                <MovementTile key={movement?._id} mvmt={movement} setSelectedMovementInfo={setSelectedMovementInfo} />
                            )
                        })
                    }
                </div>
            }
            {
                (status === 'loading' || swapMovementSectionStatus === 'loading') && <Loader className={'fixed top-0 left-0 h-screen w-full bg-black z-[100]'} />
            }
            {
                status === 'error' && <Error className={'w-full mx-auto'}><h3 className='text-red'>Oops! <br /> Could not fetch the list of movements</h3></Error>
            }
            {
                swapMovementSectionStatus === 'error' && <Error className={'w-full h-screen mx-auto fixed top-0 left-0 bg-black z-[100]'} ><h3 className='text-red'>Oops! <br /> Could not swap the movement</h3></Error>
            }
            {
                showAlertDialog && <AlertDialog handleAlertDialog={handleAlertMessage} message={"Are you sure you want to swap your current movement with this one?"}/>
            }
            {
                showDetail && selectedMovementDetail && <MovementDetail mvmt={selectedMovementDetail} />
            }
        </div>
    )
}

export default SwapMovementOptions