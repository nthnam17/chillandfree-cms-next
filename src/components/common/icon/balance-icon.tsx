import * as React from 'react';
interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const BalanceIcon: React.FC<Props> = ({
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
            d="M6 10h8m-8 4h1m4 0h3m6 5c-1.333 0-2-.667-2-2V5H2v11c0 2 1 3 3 3h15Z"
        />
        <path
            stroke={fill}
            strokeWidth={strokeWidth}
            d="M22 5v12c0 1.333-.667 2-2 2"
        />
    </svg>
);

BalanceIcon.defaultProps = {
    size: 46,
    width: 46,
    height: 46,
    fill: 'currentColor',
    strokeWidth: 1,
};

export default BalanceIcon;
