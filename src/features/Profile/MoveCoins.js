import React, { useMemo } from 'react';
import styled from 'styled-components';
import BGMoveCoins from '../../assets/images/bg-movecoins.svg';
import { useNavigate } from 'react-router-dom';

const Heading = styled.div`
  color: var(--Light-gray, #b1b1b1);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 8px;
  font-style: normal;
  font-weight: 510;
  line-height: normal;
  letter-spacing: 3px;
  text-transform: uppercase;
  mix-blend-mode: plus-lighter;
`;
const Coins = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  background: var(
    --Green-purple-gradient,
    linear-gradient(96deg, #9bf2c0 1.49%, #91bdf6 103.49%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Description = styled.div`
  color: #545454;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 9.333px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  mix-blend-mode: plus-lighter;
`;
function MoveCoins({ coins }) {
  const navigate = useNavigate();
  function navigateToMarketPlace() {
    navigate('/marketplace', { replace: true });
  }
  function formatNumberWithCommas(number) {
    // Convert the number to a string
    const numberString = number.toString();

    // Use a regular expression to add commas
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedNumber;
  }
  const formattedCoins = useMemo(() => formatNumberWithCommas(coins), [coins]);
  return (
    <div
      className="mt-8 flex h-[104px] w-full flex-col items-center justify-center gap-2 rounded-[12px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BGMoveCoins})` }}
      onClick={navigateToMarketPlace}
    >
      <Heading>Movecoins</Heading>
      <Coins>{formattedCoins}</Coins>
      <Description>Use at OTM marketplace</Description>
      {/* <Description>Coming Soon...</Description> */}
    </div>
  );
}

export default MoveCoins;
