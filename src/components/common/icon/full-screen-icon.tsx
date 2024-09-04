import * as React from 'react';
interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const FullScreenIcon: React.FC<Props> = ({
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
            clipRule="evenodd"
            d="M8.914 14.127a.6.6 0 0 0-.849 0L3.15 19.042V15.72a.6.6 0 1 0-1.2 0v4.77a.6.6 0 0 0 .6.6h4.77a.6.6 0 1 0 0-1.2H4l4.915-4.915a.6.6 0 0 0 0-.848Zm5.213 0a.6.6 0 0 1 .848 0l4.915 4.915V15.72a.6.6 0 0 1 1.2 0v4.77a.6.6 0 0 1-.6.6h-4.77a.6.6 0 1 1 0-1.2h3.322l-4.915-4.915a.6.6 0 0 1 0-.848Zm0-5.213a.6.6 0 0 0 .848 0l4.915-4.915V7.32a.6.6 0 0 0 1.2 0V2.55a.6.6 0 0 0-.6-.6h-4.77a.6.6 0 1 0 0 1.2h3.322l-4.915 4.915a.6.6 0 0 0 0 .849Zm-5.213 0a.6.6 0 0 1-.849 0L3.15 3.999V7.32a.6.6 0 0 1-1.2 0V2.55a.6.6 0 0 1 .6-.6h4.77a.6.6 0 0 1 0 1.2H4l4.915 4.915a.6.6 0 0 1 0 .849Z"
            fillRule="evenodd"
            stroke={fill}
            strokeWidth={strokeWidth}
        />
    </svg>
);

FullScreenIcon.defaultProps = {
    size: 24,
    width: 24,
    height: 24,
    fill: '#ffffff',
    strokeWidth: 1,
};

export default FullScreenIcon;
