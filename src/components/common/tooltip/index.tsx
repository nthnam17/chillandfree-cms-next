import { Tooltip } from '@mantine/core';
import React from 'react';
import type { FloatingPosition } from '@mantine/core';
interface TooltipElementProps {
    element: React.ReactNode;
    innerRef?: React.ForwardedRef<HTMLDivElement>;
    onClick?: () => void;
}
// forwardRef function will allow to get root element ref
export const TooltipElement = ({
    innerRef,
    element,
    onClick,
}: TooltipElementProps) => {
    return (
        <div
            className="cursor-pointer w-max h-max"
            onClick={onClick}
            ref={innerRef}
        >
            {element}
        </div>
    );
};

interface TooltipCustomProps {
    label: string;
    element: React.ReactNode;
    onClick?: () => void;
    className?: string;
    color?: string;
    position?: FloatingPosition;
}

const TooltipCustom = ({
    label,
    element,
    onClick,
    className,
    color,
    position,
}: TooltipCustomProps) => {
    return (
        <Tooltip
            className={className}
            label={label}
            multiline
            onClick={onClick}
            refProp="innerRef"
            withArrow
            color={color}
            position={position}
            transitionProps={{ transition: 'skew-up', duration: 300 }}
        >
            <TooltipElement onClick={onClick} element={element} />
        </Tooltip>
    );
};

export default TooltipCustom;
