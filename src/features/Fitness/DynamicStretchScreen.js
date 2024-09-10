import { RxCross1 } from 'react-icons/rx';

const DynamicStretchScreen = ({ setDynamicStretchScreen }) => {
  return (
    <>
      <div className="px-5">
        <div className="flex w-full justify-between ">
          <div> Dynamic Stretch</div>

          <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-mediumGray ">
            <RxCross1
              onClick={() => setDynamicStretchScreen(false)}
              className=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center bg-red">
          <div className="player-wrapper mt-7 h-[500px] max-w-[500px]">
            <iframe
              width="100%"
              height="100%"
              src={
                'https://www.youtube.com/embed/g2638TELdTk?si=V3GEaoJSgHBQI1R7'
              }
              title="YouTube video player"
              loading="lazy"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicStretchScreen;
