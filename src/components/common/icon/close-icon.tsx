import * as React from 'react';

const CloseIcon = ({
    size = 28,
    strokeWidth = 1.5,
    color = 'currentColor',
    ...props
}) => (
    <svg
        fill="none"
        height={size}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
        <path d="m14.829 9.172-5.657 5.657" />
        <path d="m9.172 9.172 5.656 5.657" />
    </svg>
);

export default CloseIcon;
