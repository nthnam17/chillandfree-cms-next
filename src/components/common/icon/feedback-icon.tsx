import * as React from 'react';
interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const FeedbackIcon: React.FC<Props> = ({
    size,
    width,
    height,
    fill,
    strokeWidth,
}) => (
    <svg
        fill="none"
        height={size || height || 24}
        stroke={fill}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            stroke={fill}
            strokeWidth={strokeWidth}
            d="M15 4.5H4.125A1.875 1.875 0 0 0 2.25 6.375v11.25A1.875 1.875 0 0 0 4.125 19.5h15.69a1.875 1.875 0 0 0 1.875-1.875v-6.422"
        />
        <path
            stroke={fill}
            strokeWidth={strokeWidth}
            d="M5.25 7.5 12 12.75l4.078-3.078"
        />
        <path
            d="M20.248 8.253a2.248 2.248 0 1 0 0-4.495 2.248 2.248 0 0 0 0 4.495Z"
            stroke={fill}
            strokeWidth={strokeWidth}
        />
        <path
            d="M20.25 9.003a2.998 2.998 0 1 1 0-5.995 2.998 2.998 0 0 1 0 5.995Zm0-4.495a1.5 1.5 0 1 0-.005 3 1.5 1.5 0 0 0 .005-3Z"
            stroke={fill}
            strokeWidth={strokeWidth}
        />
    </svg>
);

FeedbackIcon.defaultProps = {
    size: 46,
    width: 46,
    height: 46,
    fill: 'currentColor',
    strokeWidth: 1,
};

export default FeedbackIcon;
