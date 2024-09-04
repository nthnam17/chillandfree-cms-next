import * as React from 'react';
interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const ServicesIcon: React.FC<Props> = ({
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
     <path stroke={fill} strokeWidth={strokeWidth} d="M16.5 6.75h5.25V12" />
        <path
            stroke={fill}
            strokeWidth={strokeWidth}
            d="m2.25 17.25 5.69-5.69a1.5 1.5 0 0 1 2.12 0l2.38 2.38a1.5 1.5 0 0 0 2.12 0L21 7.5"
        />
    </svg>
);

ServicesIcon.defaultProps = {
    size: 46,
    width: 46,
    height: 46,
    fill: 'currentColor',
    strokeWidth: 1,
};

export default ServicesIcon;

