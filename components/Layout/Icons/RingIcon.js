import React from 'react';

const getFillOffset = (percentage, circumference) => {
  return (circumference * (100 - percentage)) / 100;
};

const SellStepsIcon = ({ currentStep, totalSteps }) => {
  const ringSize = 40;
  const strokeWidth = 4;
  const center = ringSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = Math.PI * radius * 2;
  const fillPercentage = (currentStep / totalSteps) * 100;
  const fillOffset = getFillOffset(fillPercentage, circumference);

  return (
    <div className="step-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`} fill="none">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#F3F3F3" 
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`} 
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#E46D1D" 
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={fillOffset} 
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`} 
        />
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#302C2C"
        >
          {currentStep}/{totalSteps}
        </text>
      </svg>
    </div>
  );
};

export default SellStepsIcon;
