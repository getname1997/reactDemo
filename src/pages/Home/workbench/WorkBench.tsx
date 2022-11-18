import React from 'react';
import portrait from '@/assets/img/img_1.png';
const WorkBench: React.FC = () => {
  let name = '增增';
  return (
    <>
      <div>
        <h1>欢迎使用工作台</h1>
        <svg
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <pattern
              id="raduisImage"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
            >
              <image
                xlinkHref={portrait}
                x="0"
                y="0"
                height="100"
                width="100"
              />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#raduisImage)"></circle>
          <path
            d="M 4.18 70 q45.82 7.62 91.64 0 M 95.82 70 A50 50 0 0 1 4.18 70"
            stroke="none"
            strokeWidth="1"
            fill="#4893f9"
          ></path>
          <text x="35" y="90" fontSize={14} fill="#fff">
            {name}
          </text>
        </svg>
      </div>
    </>
  );
};

export default WorkBench;
