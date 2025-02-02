import React, { useEffect, useRef, useState } from 'react';

const BMIQuestionInput = ({ code, setResponse, response, responseValue }) => {
  // Base array of numbers 1-100

  const baseArray = [
    ...Array(
      (code === 'onb2' && 100) ||
        (code === 'onb3' && 150) ||
        (code === 'onb4' && 300),
    ),
  ].map((_, i) => i + 1);

  // Duplicate the array to ensure smooth scrolling
  const initialItems = [...baseArray, ...baseArray, ...baseArray];
  const [hasScrolled, setHasScrolled] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    // Center the scroll on the middle array when the component loads
    if (containerRef.current) {
      const middlePosition = baseArray.length * 6; // Item width = 6px (w-2 * 3)
      containerRef.current.scrollLeft = middlePosition;
    }
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = 6; // Each number card's width (adjusted for `w-2`)
    const totalItems = baseArray.length;

    // Calculate the current number based on the scroll position
    const middleIndex = Math.floor(scrollLeft / itemWidth) % totalItems;
    const calculatedNumber = baseArray[middleIndex];

    setCurrentNumber(
      responseValue.value[0] ? responseValue.value[0] : calculatedNumber || 1,
    );
    if (!hasScrolled) {
      setHasScrolled(true);
    }

    // Only call setResponse if the user has scrolled
    if (hasScrolled) {
      setResponse((prev) => {
        // Check if the code already exists in the array
        const updatedResponse = prev.map((item) =>
          item.code === code
            ? { ...item, value: [calculatedNumber] } // Update the value if the code matches
            : item,
        );

        // If the code doesn't exist, add a new entry
        if (!updatedResponse.some((item) => item.code === code)) {
          updatedResponse.push({ code, value: [calculatedNumber] });
        }

        return updatedResponse;
      });
    }

    // Handle infinite scrolling logic
    const scrollWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;

    // When reaching near the start of the middle set, reset scroll to the middle
    if (scrollLeft < visibleWidth) {
      container.scrollLeft += totalItems * itemWidth;
    }

    // When reaching near the end of the middle set, reset scroll to the middle
    if (scrollLeft + visibleWidth > scrollWidth - visibleWidth) {
      container.scrollLeft -= totalItems * itemWidth;
    }
  };

  return (
    <div className="relative w-full">
      {/* Display the current number */}
      <div className="mb-3 flex items-end justify-center gap-1  font-futura  text-lg  font-medium text-blue">
        <span className="font-futura  text-[40px]">{currentNumber} </span>
        <span className="h-min font-futura text-[20px] leading-[20px]">
          {' '}
          {code === 'onb2' && 'yrs'}
          {code === 'onb3' && 'kgs'}
          {code === 'onb4' && 'cm'}
        </span>
      </div>
      <div
        ref={containerRef}
        className="scrollbar-hide flex items-end space-x-1 overflow-x-scroll"
        onScroll={handleScroll}
      >
        {initialItems.map((number, index) => (
          <div
            key={index}
            className={`flex w-2 flex-none items-center justify-center border-l border-offwhite ${
              number % 7 === 0 ? 'bg-blue-500 h-5' : 'bg-gray-300 h-3'
            }`}
            style={{
              scrollSnapAlign: 'center',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BMIQuestionInput;
