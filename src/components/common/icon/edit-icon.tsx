import React from 'react';

export const EditIcon = ({ size = 20, color = 'currentColor', ...props }) => {
    return (
        <svg
            fill={color}
            height={size}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="m12.9 6.86 4.242 4.243-9.9 9.899H3v-4.243l9.9-9.9v.001Zm1.414-1.414 2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242Z" />
        </svg>
    );
};
