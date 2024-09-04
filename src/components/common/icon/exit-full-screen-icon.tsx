import * as React from 'react';
interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const ExitFullScreenIcon: React.FC<Props> = ({
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
            d="M8.875 2a.625.625 0 0 1 .625.625v5A1.875 1.875 0 0 1 7.625 9.5h-5a.625.625 0 0 1 0-1.25h5a.625.625 0 0 0 .625-.625v-5A.625.625 0 0 1 8.875 2Zm6.25 0a.625.625 0 0 1 .625.625v5a.625.625 0 0 0 .625.625h5a.625.625 0 1 1 0 1.25h-5A1.875 1.875 0 0 1 14.5 7.625v-5A.625.625 0 0 1 15.125 2ZM2 15.125a.625.625 0 0 1 .625-.625h5A1.875 1.875 0 0 1 9.5 16.375v5a.625.625 0 1 1-1.25 0v-5a.625.625 0 0 0-.625-.625h-5A.625.625 0 0 1 2 15.125Zm12.5 1.25a1.875 1.875 0 0 1 1.875-1.875h5a.624.624 0 1 1 0 1.25h-5a.624.624 0 0 0-.625.625v5a.624.624 0 1 1-1.25 0v-5Z"
            stroke={fill}
            strokeWidth={strokeWidth}
        />
    </svg>
);

ExitFullScreenIcon.defaultProps = {
    size: 24,
    width: 24,
    height: 24,
    fill: '#ffffff',
    strokeWidth: 1,
};

export default ExitFullScreenIcon;
