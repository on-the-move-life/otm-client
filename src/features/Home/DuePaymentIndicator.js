import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
height: 40px;
padding: 4px 20px;
justify-content: center;
align-items: center;
gap: 8px;
flex-shrink: 0;
border-radius: 8px;
border: 0.5px solid var(--Red, #FA5757);
background: #160606;
`
const WarningText = styled.p`
color: var(--Red, #FA5757);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 11px;
font-style: normal;
font-weight: 590;
line-height: normal;
letter-spacing: 1px;
`
const RightArrow = styled.p`
color: var(--Red, #FA5757);
text-align: center;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 21px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
function DuePaymentIndicator() {
    const Warning = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.0016 11.8502V7.61665M11.0016 14.9881V15.0254M16.2935 18.5513H5.70963C4.26393 18.5513 3.04389 17.5851 2.66004 16.2632C2.49618 15.6989 2.69752 15.1112 3.00547 14.6107L8.29741 4.96127C9.53725 2.9465 12.4659 2.9465 13.7057 4.96127L18.9977 14.6107C19.3056 15.1112 19.5069 15.6989 19.3431 16.2632C18.9592 17.5851 17.7392 18.5513 16.2935 18.5513Z" stroke="#FA5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
    return (
        <Container className='w-full'>
            <div className='flex flex-row justify-center items-center gap-3'>
                <Warning/>
                <WarningText>Action required: Your subscription is due for renewal</WarningText>
                <RightArrow>{'→'}</RightArrow>
            </div>
        </Container>
    )
}

export default DuePaymentIndicator