import * as React from 'react';
interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const RecruitmentIcon: React.FC<Props> = ({
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
            d="M12 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        />
        <path
            stroke={fill}
            strokeWidth={strokeWidth}
            d="M2 20.5c0-4.418 4.03-8 9-8"
        />
        <path
            stroke={fill}
            strokeWidth={strokeWidth}
            d="M17.5 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        />
        <path stroke={fill} strokeWidth={strokeWidth} d="m20 19 2 1.5" />
    </svg>
);

RecruitmentIcon.defaultProps = {
    size: 46,
    width: 46,
    height: 46,
    fill: 'currentColor',
    strokeWidth: 1,
};

export default RecruitmentIcon;
