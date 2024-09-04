import * as React from 'react';

const SaveIcon = ({ size = 46, color = 'currentColor', ...props }) => (
    <svg
        fill={color}
        height={size}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="m21.84 5.614-3.454-3.455a2.234 2.234 0 0 0-1.59-.659H4.5a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V7.205a2.234 2.234 0 0 0-.66-1.591ZM5.626 5.25h8.25a.375.375 0 0 1 .375.375v2.25a.375.375 0 0 1-.375.375h-8.25a.375.375 0 0 1-.375-.375v-2.25a.375.375 0 0 1 .375-.375Zm6.55 14.996a3.75 3.75 0 1 1-.351-7.491 3.75 3.75 0 0 1 .352 7.49Z" />
        <path d="M12 18.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
    </svg>
);

export default SaveIcon;
