import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosClient } from './apiClient';

function Report() {
    const {sessionID} = useParams();
    useEffect(() => {
        console.log("session ID in the report page : ", sessionID)
        axiosClient.get(`/lifestyle/snapshot?session_id=${sessionID}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])
  return (
    <div className='bg-white min-h-screen overflow-y-scroll text-black flex flex-col justify-start items-start py-5 px-2'>
        <img src={'/assets/otm-logo-report.svg'} alt="otm-logo"/>
    </div>
  )
}

export default Report