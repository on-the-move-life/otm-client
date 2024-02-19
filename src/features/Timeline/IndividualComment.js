import { useEffect, useState, forwardRef } from 'react';
import { FaUserCircle } from "react-icons/fa";

const IndividualComment = forwardRef(({ name, eventBy, comment, parentCommentId, isParentComment, commentId, createdAt, allComments, profilePicture }, ref) => {
    const [showReplies, setShowReplies] = useState(false);
    const [hasReplies, setHasReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [dateTime, setDateTime] = useState('');

    function handleReply(repliedTo) {
        ref.typeOfCommentRef.current = { entity: 'child', parentCommentId: commentId }

        ref.typedCommentRef.current.focus();
        // ref.typedCommentRef.current.value = `@${repliedTo} `;
    }

    function getDateTime(givenDate) {
        let currentDate = new Date();

        let differenceInMilliseconds = currentDate - givenDate;

        let differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        let differenceInMinutes = Math.floor(differenceInSeconds / 60);
        let differenceInHours = Math.floor(differenceInMinutes / 60);
        let differenceInDays = Math.floor(differenceInHours / 24);

        if (differenceInDays > 0) {
            return `${differenceInDays}d ago`
        } else if (differenceInHours > 0) {
            return `${differenceInHours}h ago`
        } else if (differenceInMinutes > 0) {
            return `${differenceInMinutes}m ago`
        } else {
            return `${differenceInSeconds}s ago`
        }
    }

    useEffect(() => {
        allComments && allComments?.map(comment => {
            if (!comment?.isParentComment && comment?.parentCommentId === commentId) {
                setHasReplies(true);
                setReplies(prev => [...prev, comment]);
            }
        })
        setDateTime(getDateTime(new Date(createdAt)));
    }, [])

    const IndividualCommentBody = ({ name, eventBy, comment, profilePicture, children }) => {
        return (
            <div className='w-full flex flex-row justify-start items-start gap-2'>
                {profilePicture ? <img src={profilePicture} alt={`${name}`} className='w-[20px] h-[20px] rounded-full object-cover' /> : <FaUserCircle size={20} />}
                <div className='w-full overflow-x-hidden flex flex-col justify-start items-start gap-2'>
                    <div className='w-full flex flex-col items-start justify-start gap-1'>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <h4 className='text-sm text-gray-400 font-bold tracking-wide'>{name}</h4>
                            <p className='text-[10px] text-gray-600'>{dateTime}</p>
                        </div>
                        <div className='w-full text-xs text-gray-300 text-wrap break-words'>
                            {comment}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        )
    }
    return (
        isParentComment &&
        <IndividualCommentBody name={name} comment={comment} profilePicture={profilePicture} >
            <div className='w-full flex flex-row justify-start items-center gap-5'>
                <div className='text-gray-600 text-[12px]' onClick={() => handleReply(name)}>Reply</div>
                {hasReplies && !showReplies && <div className='text-gray-600 text-[12px]' onClick={() => setShowReplies(true)}>View {replies?.length} more {replies?.length > 1 ? 'replies' : 'reply'}</div>}
                {hasReplies && showReplies && <div className='text-gray-600 text-[12px]' onClick={() => setShowReplies(false)}>Hide replies</div>}
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2'>
                {
                    showReplies && replies && replies?.length > 0 && replies.map((reply, index) => {
                        return (
                            <IndividualCommentBody key={Math.random() * 1000} name={reply?.name} eventBy={reply?.eventBy} comment={reply?.comment} profilePicture={profilePicture} >
                                {/* <div className='w-full flex flex-row justify-start items-center gap-5'>
                                    <div className='text-gray-600 text-sm' onClick={() => handleReply(reply?.eventBy)}>Reply</div>
                                </div> */}
                            </IndividualCommentBody>
                        )
                    })
                }
            </div>
        </IndividualCommentBody>
    )
})

export default IndividualComment;