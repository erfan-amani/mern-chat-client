import React from "react";

const DoubleTick = ({ color }) => {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 9.11111L14.8811 2"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 5.88889L4.31398 9L10.6619 1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DoubleTick;
