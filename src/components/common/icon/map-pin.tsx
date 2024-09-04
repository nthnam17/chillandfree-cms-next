import * as React from 'react';

const MapPinIcon = ({
    size = 59,
    strokeWidth = 1,
    color = 'currentColor',
    ...props
}) => (
    <svg
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M10.828 9.829a4 4 0 1 0-5.656 0L8 12.658l2.828-2.83Z" />
        <path d="M8 7v.01" />
        <path d="M18.828 17.829a4 4 0 1 0-5.656 0L16 20.658l2.828-2.83Z" />
        <path d="M16 15v.01" />
    </svg>
);

export default MapPinIcon;
