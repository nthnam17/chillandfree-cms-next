import React from 'react';

interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const DownUpIcon: React.FC<Props> = ({
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
            clipRule="evenodd"
            d="M16.2 19.92a.6.6 0 0 0 .6-.6V5.17l3.775 3.776a.6.6 0 1 0 .85-.85l-4.8-4.8a.6.6 0 0 0-.85 0l-4.8 4.8a.6.6 0 1 0 .85.85L15.6 5.169V19.32a.6.6 0 0 0 .6.6ZM7.8 3.12a.6.6 0 0 1 .6.6v14.152l3.775-3.777a.6.6 0 1 1 .85.85l-4.8 4.8a.6.6 0 0 1-.85 0l-4.8-4.8a.6.6 0 1 1 .85-.85L7.2 17.872V3.72a.6.6 0 0 1 .6-.6Z"
            fillRule="evenodd"
            stroke={fill}
            strokeWidth={strokeWidth}
        />
    </svg>
);

export default DownUpIcon;

