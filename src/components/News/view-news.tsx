/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Tabs } from '@mantine/core';
import React, { useState } from 'react';
import NextImage from '@src/components/common/CustomImage';

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newDetail: any;
};

const ViewNew = ({ newDetail }: Props) => {
    const [activeTab, setActiveTab] = useState<string | null>(
        newDetail?.newDetailList?.[0]?.languageCode,
    );

    return (
        <div>
            <Tabs onChange={setActiveTab} value={activeTab}>
                <Tabs.List className="inline-flex">
                    {newDetail?.newDetailList?.map((langue: any) => {
                        return (
                            <Box key={langue.id}>
                                <Tabs.Tab
                                    className="text-sm uppercase"
                                    value={langue.languageCode}
                                >
                                    {langue.languageCode}
                                </Tabs.Tab>
                            </Box>
                        );
                    })}
                </Tabs.List>
                <Box className="w-full flex flex-col sm:grid grid-cols-12 gap-6">
                    {newDetail?.newDetailList?.map((item: any) => {
                        return (
                            <Tabs.Panel
                                className="col-span-12"
                                key={item.id}
                                value={item.languageCode}
                            >
                                <div className="my-6">
                                    <div className="grid grid-cols-12 gap-8">
                                        <div className="col-span-4">
                                            <div className="flex justify-center">
                                                <div className="w-[800px] h-[360px] rounded-xl overflow-hidden">
                                                    <NextImage
                                                        src={
                                                            process.env
                                                                .PUBLIC_IMAGE_API_BASE_URL +
                                                            newDetail.image
                                                        }
                                                        width={1000}
                                                        height={600}
                                                        alt="Tektra"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-8">
                                            <div>
                                                <h3 className="text-xl font-semibold">
                                                    {item.title}
                                                </h3>

                                                <div
                                                    className="mt-4"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.content,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.Panel>
                        );
                    })}
                </Box>
            </Tabs>
        </div>
    );
};

export default ViewNew;
