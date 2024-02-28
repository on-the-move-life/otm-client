import React, { useEffect, useState, useMemo } from 'react'
import { AssesmentPara, AssesmentText, FitnessScore, Score } from './StyledComponents';
import Arrow from '../Leaderboard/Arrow';


function AssesmentTile({ currScore, prevScore, assessmentFeedback }) {
    const colors = useMemo(() => ['#5ECC7B', '#FA5757'], []);
    const [scoreData, setScoreData] = useState({ color: colors[0], isPositiveChange: true, percentChange: '0%' });

    useEffect(() => {
        const diff = currScore >= prevScore ? currScore - prevScore : prevScore - currScore;
        const percentChange = `${currScore >= prevScore ? '+' : '-'}${diff.toFixed(1)}`;
        const color = currScore >= prevScore ? colors[0] : colors[1];
        const isPositiveChange = currScore >= prevScore;

        setScoreData({ color, isPositiveChange, percentChange });
    }, [currScore, prevScore, colors])

    return (
        <div className='w-full h-[88px] flex flex-row items-center justify-around rounded-[10.9px] border-[1px] border-[#3F3F3F] mt-1'>
            <div className='w-6/12 flex flex-col justify-center items-start p-2 gap-1'>
                <AssesmentText>Assesment</AssesmentText>
                {
                    assessmentFeedback?.map((feedback, index) => {
                        return (
                            <AssesmentPara key={index}>•{feedback}</AssesmentPara>
                        )
                    })
                }
            </div>
            <div className='w-6/12 flex flex-col justify-center items-center gap-1'>
                <FitnessScore>Fitness Score</FitnessScore>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <Score style={{ color: scoreData.color }}>{currScore}</Score>
                    {currScore !== prevScore &&
                        <div className='flex flex-col items-center justify-center'>
                            <Arrow value={currScore - prevScore}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AssesmentTile