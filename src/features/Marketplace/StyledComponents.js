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