import * as React from 'react';

const SearchIcon = ({
    size = 46,
    strokeWidth = 1.5,
    color = 'currentColor',
    ...props
}) => (
    <svg
        fill="none"
        height={size}
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727v0Z" />
        <path d="M15.857 15.86 21 21.001" />
    </svg>
);

export default SearchIcon;
