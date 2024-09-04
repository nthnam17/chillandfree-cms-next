import React from 'react';

interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const UpIcon: React.FC<Props> = ({
    size,
    width,
    height,
    fill,
    strokeWidth,
}) => (
    <svg
        height={size || height || 24}
        stroke={fill}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.08 17.88a.6.6 0 0 1-1.2 0V7.33L4.505 8.705a.6.6 0 1 1-.85-.85l2.4-2.398.009-.009a.598.598 0 0 1 .84.007l2.4 2.4a.6.6 0 0 1-.849.85L7.08 7.329V17.88Zm4.2-10.8a.6.6 0 0 1 .6-.6h8.4a.6.6 0 0 1 0 1.2h-8.4a.6.6 0 0 1-.6-.6Zm.6 3a.6.6 0 1 0 0 1.2h6a.6.6 0 1 0 0-1.2h-6Zm0 3.6a.6.6 0 1 0 0 1.2h3.6a.6.6 0 1 0 0-1.2h-3.6Zm0 3.6a.6.6 0 1 0 0 1.2h1.2a.6.6 0 1 0 0-1.2h-1.2Z"
            stroke={fill}
            strokeWidth={strokeWidth}
        />
    </svg>
);

export default UpIcon;
