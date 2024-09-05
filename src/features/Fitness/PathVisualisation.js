import React from 'react';

const PathVisualization = ({ level }) => {
  // Define the coordinates and labels for each point, including the image
  const points = [
    { x: 15, y: 70, label: '1', description: 'You are here' },
    { x: 35, y: 50, label: '2', description: 'You are here' },
    { x: 55, y: 55, label: '3', description: 'You are here' },
    { x: 80, y: 50, label: '4', description: 'You are here' },
    { x: 65, y: 33, label: '5', description: 'You are here' },
    {
      x: 85,
      y: 20,
      label: '6',
      description: 'Your ideal self',
      isImage: true,
    }, // Use an image instead of text
  ];

  // Define the path data for the dotted line that connects all points
  const pathData = points
    .map((point, index) => {
      if (index === 0) return `M${point.x},${point.y}`; // Move to the first point
      return `L${point.x},${point.y}`; // Draw line to the subsequent points
    })
    .join(' ');

  return (
    <svg
      className="flex  w-full flex-col items-center justify-center"
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Draw the dotted path */}
      <path
        d={pathData}
        stroke="#6c63ff"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="1,1"
      />

      {/* Draw each point */}
      {points.map((point, index) => (
        <g key={index}>
          {/* Point or Image */}
          {point.isImage ? (
            <>
              <image
                href="./assets/movement-star-bg.svg" // Replace with the actual path to your image
                x={`${point.x - 20}%`} // Adjust position to center the image
                y={`${point.y - 18}%`} // Adjust position to center the image
                width="35%"
                height="35%"
              />
              <image
                href="./assets/movement-star.svg" // Replace with the actual path to your image
                className="relative z-10"
                x={`${point.x - 7}%`} // Adjust position to center the image
                y={`${point.y - 5}%`} // Adjust position to center the image
                width="15%"
                height="15%"
              />
            </>
          ) : (
            <circle
              cx={`${point.x}`}
              cy={`${point.y}`}
              r="2.5"
              fill="#6c63ff"
            />
          )}

          {/* Label */}
          {!point.isImage && (
            <text
              x={`${point.x}`}
              y={`${point.y + 1}`}
              fill="#000000"
              fontSize="3"
              textAnchor="middle"
            >
              {point.label}
            </text>
          )}

          {/* Description */}
          {point.label === level.toString() && point.description && (
            <>
              <text
                x={`${point.x - 0}`}
                y={point.label === '' ? `${point.y - 8}` : `${point.y - 10}`}
                fill="rgba(248, 248, 248, 0.8)"
                fontSize="2.5"
                textAnchor="middle"
              >
                {point.description}
              </text>

              <>
                <image
                  href="./assets/location-yellow.svg" // Replace with the actual path to your image
                  className="relative z-50"
                  x={`${point.x - 2.5}`} // Adjust position to center the image
                  y={`${point.y - 8}`} // Adjust position to center the image
                  width="5%"
                  height="5%"
                />
                <image
                  href="./assets/movement-yellow-bg.svg" // Replace with the actual path to your image
                  className="relative z-50"
                  x={`${point.x - 20}`} // Adjust position to center the image
                  y={`${point.y - 20}`} // Adjust position to center the image
                  width="40%"
                  height="40%"
                />
              </>
            </>
          )}
          {point.label === '6' && (
            <text
              x={`${point.x - 0}`}
              y={point.label === '' ? `${point.y - 8}` : `${point.y - 10}`}
              fill="rgba(248, 248, 248, 0.8)"
              fontSize="2.5"
              textAnchor="middle"
            >
              {point.description}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

export default PathVisualization;
