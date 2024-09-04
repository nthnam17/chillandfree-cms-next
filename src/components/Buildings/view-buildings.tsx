import { Box, Tabs } from '@mantine/core';
import React, { useState } from 'react';
import NextImage from '@src/components/common/CustomImage';

type Props = {
    buildingDetail: any;
};

const ViewBuildings = ({ buildingDetail }: Props) => {
    return (
        <div>
            <Box className="w-full flex flex-col sm:grid grid-cols-12 gap-6">
                {buildingDetail?.newDetailList?.map((item: any) => {
                    return (
                        <div className="my-6">
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-4">
                                    <div className="flex justify-center">
                                        <div className="w-[800px] h-[360px] rounded-xl overflow-hidden">
                                            <NextImage
                                                src={
                                                    process.env
                                                        .PUBLIC_IMAGE_API_BASE_URL +
                                                    buildingDetail.image
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
                    );
                })}
            </Box>
        </div>
    );
};

export default ViewBuildings;
