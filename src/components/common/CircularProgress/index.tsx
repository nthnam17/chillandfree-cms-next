import { LoadingOverlay } from '@mantine/core';
import React from 'react';

const CircularProgress = () => {
    return (
        <div className="w-full h-[100vh] fixed z-[9999]">
            <LoadingOverlay
                loaderProps={{ color: '#f58920', type: 'bars' }}
                visible={true}
                zIndex={1000}
            />
            <div className="w-full h-[100vh] bg-[#01757b] bg-opacity-40"></div>
        </div>
    );
};

export default CircularProgress;
