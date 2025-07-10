import React from "react";

interface ArclaneLogoProps {
  className?: string;
}

export default function ArclaneLogo({ className = "" }: ArclaneLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
      >
        <path
          d="M400 150C400 150 550 250 650 400C750 550 650 650 500 650C350 650 250 550 250 400C250 250 300 200 400 150Z"
          fill="url(#arclane-gradient)"
          stroke="none"
        />

        <defs>
          <linearGradient
            id="arclane-gradient"
            x1="250"
            y1="150"
            x2="650"
            y2="650"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FF6B00" />

            <stop offset="1" stopColor="#D9D9D9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
