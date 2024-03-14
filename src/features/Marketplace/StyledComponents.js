import styled from "styled-components";

export const MarketPlaceHeading = styled.div`
/* Small shadow */
text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);

/* H1 */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: 40px; /* 125% */
background: var(--Gradient-purple, linear-gradient(95deg, #D6B6F0 2.94%, #7E87EF 96.92%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

export const Name = styled.div`
color: var(--Light-purple, #D6B6F0);
text-shadow: 0px 3.9px 3.9px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 26px;
font-style: normal;
font-weight: 500;
line-height: 41.6px; /* 160% */
text-transform: capitalize;
`

export const MoveCoins = styled.div`
color: var(--Green, #5ECC7B);
text-shadow: 0px 2.307px 2.307px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: ${props => props.fontSize || '26px'};
font-style: normal;
font-weight: 500;
line-height: 24.607px; /* 94.642% */
text-transform: capitalize;
`
export const StatusTagText = styled.div`
color: rgba(0, 0, 0, 0.65);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 7.902px;
font-style: normal;
font-weight: 590;
line-height: normal;
letter-spacing: -0.237px;
text-transform: capitalize;
`
export const DiscountTag = styled.div`
color: var(--Red, #FA5757);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 38.959px;
font-style: normal;
font-weight: 800;
line-height: 30px; /* 160% */
text-transform: capitalize;
`
export const DiscountDescription = styled.div`
color: #545454;

/* Card body */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.333px;
font-style: normal;
font-weight: 500;
line-height: normal;
`

export const OffersTitle = styled.div`
color: var(--New-White, rgba(255, 255, 255, 0.56));

/* Small shadow */
text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);

/* H2 */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 32px; /* 160% */
text-transform: capitalize;
`