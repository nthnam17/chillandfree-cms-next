import { CSSProperties } from 'react';
import Image from 'next/image';
import DefautImage from '@public/NoPicture_s.png';

interface CustomImageProps {
    src: string;
    alt: string;
    onClick?: () => void;
    onLoad?: () => void;
    className?: string;
    style?: CSSProperties;
    width?: number;
    height?: number;
    sizes?: string;
    quality?: number;
}

const CustomImage = ({
    src,
    alt,
    className,
    onClick,
    onLoad,
    style,
    width,
    height,
    sizes,
    quality,
}: CustomImageProps) => {
    const handleImageError = (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
    ) => {
        event.currentTarget.src = DefautImage.src;
    };

    const handleLoad = () => {
        if (onLoad) {
            onLoad();
        }
    };
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <Image
            alt={alt}
            className={className}
            data-sizes="auto"
            data-src={src}
            height={height}
            onClick={handleClick}
            onError={handleImageError}
            onLoad={handleLoad}
            quality={quality}
            sizes={sizes}
            src={src}
            style={style}
            width={width}
        />
    );
};

export default CustomImage;
