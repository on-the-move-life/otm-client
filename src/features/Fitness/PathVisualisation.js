import React from 'react';

const PathVisualization = () => {
  // Define the coordinates and labels for each point, including the star
  const points = [
    { x: 25, y: 280, label: '1' },
    { x: 90, y: 250, label: '2', description: 'You are here' },
    { x: 180, y: 230, label: '3' },
    { x: 270, y: 210, label: '4' },
    { x: 210, y: 150, label: '5' },
    {
      x: 260,
      y: 100,
      label: '',
      description: 'Your ideal self',
      isStar: true,
    }, // Added star as a point
  ];

  // Define the path data for the dotted line that connects all points
  const pathData = points
    .map((point, index) => {
      if (index === 0) return `M${point.x},${point.y}`; // Move to the first point
      return `L${point.x},${point.y}`; // Draw line to the subsequent points
    })
    .join(' ');

  return (
    <svg width="350" height="300">
      {/* Draw the dotted path */}
      <path
        d={pathData}
        stroke="#6c63ff"
        strokeWidth="1"
        fill="none"
        strokeDasharray="3,3"
      />

      {/* Draw each point */}
      {points.map((point, index) => (
        <g key={index}>
          {/* Point or Star */}
          {point.isStar ? (
            <text
              x={point.x}
              y={point.y + 5}
              fill="gold"
              fontSize="24"
              textAnchor="middle"
            >
              ★
            </text>
          ) : (
            <circle cx={point.x} cy={point.y} r="8" fill="#6c63ff" />
          )}

          {/* Label */}
          <text
            x={point.x}
            y={point.y + 5}
            fill="white"
            fontSize="10"
            textAnchor="middle"
          >
            {point.label}
          </text>

          {/* Description */}
          {point.description && (
            <text x={point.x + 15} y={point.y} fill="white" fontSize="12">
              {point.description}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

export default PathVisualization;
