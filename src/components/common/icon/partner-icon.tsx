import * as React from 'react';
interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const PartnerIcon: React.FC<Props> = ({
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
            d="m2.23 6.42 8.888-1.888a1 1 0 0 1 .752.14L15.92 7.3a1 1 0 0 0 .752.14l2.04-.434a1 1 0 0 1 1.186.77l.312 1.467a1 1 0 0 1-.77 1.186l-3.507.746a1 1 0 0 1-.753-.14l-4.05-2.63a1 1 0 0 0-.752-.139l-1.551.33"
        />
        <path
            stroke={fill}
            strokeWidth={strokeWidth}
            d="m21.77 16.58-8.888 1.889a1 1 0 0 1-.752-.14L8.08 15.7a1 1 0 0 0-.752-.139l-2.04.434a1 1 0 0 1-1.186-.77l-.312-1.468a1 1 0 0 1 .77-1.186l3.507-.745a1 1 0 0 1 .753.14l4.05 2.629a1 1 0 0 0 .752.14l1.551-.33"
        />
    </svg>
);

PartnerIcon.defaultProps = {
    size: 46,
    width: 46,
    height: 46,
    fill: 'currentColor',
    strokeWidth: 1,
};

export default PartnerIcon;
