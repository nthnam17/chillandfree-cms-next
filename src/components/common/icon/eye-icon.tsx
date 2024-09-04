import * as React from 'react';

const EyeIcon = ({
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
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 19c-4 0-7.333-2.333-10-7 2.667-4.667 6-7 10-7s7.333 2.333 10 7c-.42.736-.858 1.414-1.311 2.033" />
        <path d="m15 19 2 2 4-4" />
    </svg>
);

export default EyeIcon;
