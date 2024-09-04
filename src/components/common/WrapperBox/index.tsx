import { Box, Title } from '@mantine/core';
import React from 'react';
type Props = {
    title: string;
    children: React.ReactNode;
};

const WrapperBox = ({ title, children }: Props) => {
    return (
        <Box className="px-4 py-8 border border-dashed border-primary-border rounded-lg">
            <Title className="mb-4 text-[15px] font-medium uppercase">
                ✔ {title}
            </Title>

            <Box mt="4">{children}</Box>
        </Box>
    );
};

export default WrapperBox;
