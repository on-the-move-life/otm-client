import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../Workout/AlertDialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DynamicStretchScreen = () => {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);

  const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const movementId = queryParams.get('movementId');
  const movementName = queryParams.get('movementName');
  const date = queryParams.get('date');

  const handleAlertDialog = (confirm) => {
    if (confirm === true) {
      setAlertVisible(false);
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-movement/workout`,
          {
            movementId: movementId,
            memberCode: memberCode,
            movementName: movementName,
            action: 'update_completion_status',
            createdAt: new Date(date),
          },
        )
        .then((res) => {
          toast.success('Workout is updated');
        })
        .catch((err) => {
          console.log(err.message);
          toast.error('Error with updating workout');
        })
        .finally(() => {
          navigate('/home');
        });
    }
    if (confirm === false) {
      setAlertVisible(false);
    }
  };

  return (
    <div className="relative h-screen w-screen ">
      <img
        loading="lazy"
        src="assets/movement-frame.svg"
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />
      <div className="flex h-full flex-col justify-between px-5 py-8">
        <div>
          <div className="flex w-full justify-between ">
            <div className="font-sfpro text-[32px] leading-10 text-offwhite">
              {' '}
              Dynamic Stretch
            </div>

            <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-mediumGray ">
              <RxCross1 onClick={() => navigate('/home')} className="" />
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center ">
            <div className="player-wrapper h-[512px] max-w-[500px]   rounded-xl bg-black-opacity-45 ">
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
        <div className="mt-7 pb-5">
          <p className="w-full py-3 text-center text-[12px] text-offwhite">
            Submit and save your progress
          </p>
          <button
            onClick={() => setAlertVisible(true)}
            type="submit"
            style={{
              backgroundColor: '#7E87EF',
            }}
            className="relative    flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg leading-8  text-black backdrop-blur-md"
          >
            Submit
          </button>
        </div>
        {alertVisible && (
          <AlertDialog
            message="Mark this as completed?"
            submitButtonColor={'bg-[#7E87EF]'}
            handleAlertDialog={handleAlertDialog}
          />
        )}
      </div>
    </div>
  );
};

export default DynamicStretchScreen;
