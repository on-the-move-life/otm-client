import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";

const IndividualComment = ({ name, comment, profilePicture, replies }) => {
    const [showReplies, setShowReplies] = useState(false);

    const IndividualCommentBody = ({ name, comment, profilePicture, children }) => {
        return (
            <div className='w-full flex flex-row justify-start items-start gap-2'>
                {profilePicture ? <img src={profilePicture} alt={`${name}`} className='w-[20px] h-[20px] rounded-full object-cover' /> : <FaUserCircle size={20} />}
                <div className='w-full overflow-x-hidden flex flex-col justify-start items-start gap-2'>
                    <div className='w-full flex flex-col items-start justify-start gap-1'>
                        <h4 className='text-sm text-gray-300 font-bold tracking-wide'>{name}</h4>
                        <div className='w-full text-xs text-gray-200 text-wrap break-all'>
                            {comment}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        )
    }
    return (
        <IndividualCommentBody name={name} comment={comment} profilePicture={profilePicture}>
            <div className='w-full flex flex-row justify-start items-center gap-5'>
                <div className='text-gray-600 text-sm'>Reply</div>
                {replies && replies?.length > 0 && !showReplies && <div className='text-gray-600 text-sm' onClick={() => setShowReplies(true)}>View {replies?.length} more replies</div>}
                {replies && replies?.length > 0 && showReplies && <div className='text-gray-600 text-sm' onClick={() => setShowReplies(false)}>Hide replies</div>}
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2'>
                {
                    showReplies && replies && replies?.length > 0 && replies.map((reply, index) => {
                        return (
                            <IndividualCommentBody key={Math.random() * 1000} name={reply?.name} comment={reply?.comment} profilePicture={reply?.profilePicture} />
                        )
                    })
                }
            </div>
        </IndividualCommentBody>
    )
}

export default IndividualComment;