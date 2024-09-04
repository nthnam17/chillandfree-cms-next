import React from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';
const Error = () => {
    return (
        <div className="flex justify-center items-center flex-col h-[90vh] ">
            <div>
                <h1 className="text-[10rem] font-[900] bg-[url('/404-bg.jpeg')] bg-clip-text bg-cover bg-center text-transparent">
                    Oops!
                </h1>
            </div>

            <div className="w-max mx-auto">
                <h1 className="text-[1rem] md:text-[2rem] font-[900] bg-[url('/404-bg.jpeg')] bg-clip-text bg-cover bg-center text-transparent">
                    404 Trang web không được tìm thấy
                </h1>
            </div>
            <div className="flex flex-col">
                <Button className="bg-[#e5e7eb] text-[#000000]">
                    <Link href="/">Quay trở lại</Link>
                </Button>
            </div>
        </div>
    );
};

export default Error;
