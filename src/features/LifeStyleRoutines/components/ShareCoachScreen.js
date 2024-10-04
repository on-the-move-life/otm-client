import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Summary from '../Summary';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import domtoimage from 'dom-to-image';
import { RxCross1 } from 'react-icons/rx';

const ShareCoachScreen = forwardRef(
  ({ circles, date, completionHistory, setShareSummaryVisible }, ref) => {
    const [day, setDay] = useState(null);
    const contentAreaRef = useRef(null);
    const completedCaloriePercentage = 90;
    let gradient;
    const [
      percentCompletionOfSelectedDate,
      setPercentCompletionOfSelectedDate,
    ] = useState(null);

    useImperativeHandle(ref, () => ({
      captureAndSharePage,
    }));
    const captureAndSharePage = async () => {
      const contentArea = contentAreaRef.current;
      if (contentArea) {
        try {
          console.log('Attempting to capture image');

          // Store original styles
          const originalStyles = {
            height: contentArea.style.height,
            overflow: contentArea.style.overflow,
            position: contentArea.style.position,
          };

          // Find the NavigationTab
          const navTab = contentArea.querySelector(
            'div[class*="fixed bottom-[78px]"]',
          );
          const navTabOriginalDisplay = navTab ? navTab.style.display : null;

          // Temporarily modify styles for full capture and hide NavigationTab
          contentArea.style.height = 'auto';
          contentArea.style.overflow = 'visible';
          contentArea.style.position = 'static';
          if (navTab) navTab.style.display = 'none';

          // Capture screenshot
          const dataUrl = await domtoimage.toPng(contentArea, {
            width: contentArea.scrollWidth,
            height:
              contentArea.scrollHeight - (navTab ? navTab.offsetHeight : 0),
          });

          // Restore original styles and visibility
          Object.assign(contentArea.style, originalStyles);
          if (navTab) navTab.style.display = navTabOriginalDisplay;

          console.log('Image captured successfully');

          // Create share text
          const shareText = 'Check out my lifestyle summary!';

          // Check if it's a mobile device
          const isMobile = /iPhone|iPad|iPod|Android/i.test(
            navigator.userAgent,
          );

          if (isMobile && navigator.share) {
            console.log('Web Share API is supported');
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'lifestyle-summary.png', {
              type: 'image/png',
            });

            await navigator.share({
              text: shareText,
              files: [file],
            });
          } else {
            // Download image for desktop devices
            const link = document.createElement('a');
            link.download = 'lifestyle-summary.png';
            link.href = dataUrl;
            link.click();
          }
        } catch (error) {
          console.error('Error capturing or sharing screenshot:', error);
        }
      }
    };

    useEffect(() => {
      console.log('percentCompletionHistory : ', date);
      const percentCompletionHistory = completionHistory?.find(
        (history) => history.date === date,
      );
      setPercentCompletionOfSelectedDate(
        percentCompletionHistory?.completionPercentage ?? null,
      );
    }, [completionHistory, date]);

    if (percentCompletionOfSelectedDate <= 50) {
      gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 100%)';
    } else if (percentCompletionOfSelectedDate <= 80) {
      gradient =
        'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 100%)';
    } else {
      gradient =
        'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 80%, #5ECC7B 100%)';
    }

    useEffect(() => {
      const dates = new Date(date);
      // Format date with comma between weekday and day
      const formattedDate = format(dates, 'EEEE, d MMMM');
      setDay(formattedDate);
    }, [date]);

    return (
      <div
        ref={contentAreaRef}
        className="bf relative z-[150] h-screen w-full overflow-y-scroll  bg-black  px-4 pb-5 pt-10"
      >
        <div className="h-full w-full  bg-black">
          <div className="flex justify-between">
            <div>
              <h2 className="text-[20px] text-offwhite ">Lifestyle Summary</h2>
              <div className="text-[14px] text-offwhite">{day}</div>
            </div>
            <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-mediumGray ">
              <RxCross1
                onClick={() => setShareSummaryVisible(false)}
                className=""
              />
            </div>
          </div>
          <div className="mb-2 text-[14px] text-blue">
            You have completed {percentCompletionOfSelectedDate}% of you perfect
            day
          </div>

          <div className="my-1 h-3 w-full overflow-hidden rounded-full bg-gray">
            <motion.div
              className="relative h-full rounded-full px-[2px]"
              style={{
                background: gradient,
                width: `${percentCompletionOfSelectedDate}%`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${percentCompletionOfSelectedDate}%` }}
              transition={{ duration: 1 }}
            >
              <div className="absolute right-1 top-0 flex pt-[1px]">
                <span className="mt-[1px] h-2 w-2 rounded-full  bg-white"></span>
              </div>
            </motion.div>
            <span className="font-bold text-white">
              {percentCompletionOfSelectedDate}%
            </span>
            <div className="border-gray-400 ml-2 h-6 w-6 rounded-full border-2 bg-white"></div>
          </div>
          <div className="mt-[21px]">
            <Summary
              circles={circles}
              date={date}
              color={'bg-white-opacity-08'}
            />
          </div>
        </div>
      </div>
    );
  },
);

export default ShareCoachScreen;
