import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Fieldset,
    Flex,
    Select,
    Tabs,
    Text,
    TextInput,
} from '@mantine/core';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import SaveIcon from '@src/components/common/icon/save-icon';
import CloseIcon from '@src/components/common/icon/close-icon';
import TextEditor from '@src/components/common/TextEditor';
import UploadImage from '@src/components/common/UploadImage';
import { HOT, STATUS } from '@src/utils/contants';
import { notifications } from '@mantine/notifications';
import { useAddNewsMutation } from '@src/redux/endPoint/news';
import { useGetListNewsGenreQuery } from '@src/redux/endPoint/news_genre';

type Props = {
    onClose: () => void;
    investorDetailList?: any;
};

const AddHouse = ({ onClose, investorDetailList }: Props) => {
    const MANAGING_HOUSE = [
        {
            id: '',
            name: 'Tất cả',
        },
        {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        {
            id: 2,
            name: 'Nuyễn Văn B',
        },
    ];

    const PROVINCE = [
        {
            id: '',
            name: 'Tất cả',
        },
        {
            id: '1',
            name: 'Hà Nội',
        },
        {
            id: '2',
            name: 'Hồ Chí Minh',
        },
        {
            id: '3',
            name: 'Quảng Ninh',
        },
        {
            id: '4',
            name: 'Thanh Hóa',
        },
        {
            id: '5',
            name: 'Sơn la',
        },
    ];

    const DISTRICT = [
        {
            id: '',
            name: 'Tất cả',
        },
        {
            id: '1',
            name: 'Huyện của Hà Nội',
        },
        {
            id: '2',
            name: 'Huyện của Hồ Chí Minh',
        },
        {
            id: '3',
            name: 'Huyện của Quảng Ninh',
        },
        {
            id: '4',
            name: 'Huyện của Thanh Hóa',
        },
        {
            id: '5',
            name: 'Huyện của Sơn la',
        },
    ];
    const dataContent = 'Nhập thông tin thanh toán';
    const {
        reset,
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            investorDetailList: investorDetailList,
            status: '1',
            slug: '',
            managing: '',
        },
        mode: 'onTouched',
    });

    const [createNews] = useAddNewsMutation();
    const { data } = useGetListNewsGenreQuery({
        page: 1,
        pageSize: 20,
        status: 1,
    });
    const onSubmit = async (data: any) => {
        // try {
        //     const payload = {
        //         ...data,
        //         status: data.status ? Number(data.status) : 1,
        //     };
        //     await createNews(payload).unwrap();
        //     onClose();
        //     notifications.show({
        //         title: 'Thành công',
        //         color: '#06d6a0',
        //         autoClose: 2000,
        //         message: 'Thêm mới tin tức thành công',
        //     });
        // } catch (error: any) {
        //     notifications.show({
        //         title: 'Lỗi',
        //         color: '#ef476f',
        //         autoClose: 2000,
        //         message: JSON.stringify(error?.data?.error),
        //     });
        // }
    };

    const getImage = (image: string) => {
        setValue('image', image);
    };
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box
                className="box-image-customer"
                style={{
                    margin: 'auto',
                    width: '200px',
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <Box className="w-full h-full rounded-lg overflow-hidden">
                    <UploadImage
                        className="w-full h-full object-contain"
                        getDataFn={getImage}
                    />
                </Box>
            </Box>
            <Box className="w-full flex flex-col sm:grid grid-cols-12 gap-6">
                <Box className="col-span-6">
                    <TextInput
                        className="w-full"
                        label="Tên tòa nhà"
                        mt="md"
                        placeholder="Tên tòa nhà"
                    />
                    <Controller
                        control={control}
                        name={'province'}
                        render={({ field }) => (
                            <Select
                                className="col-span-3"
                                data={PROVINCE.filter((val) => val.id).map(
                                    (item: {
                                        id: number | string;
                                        name: string;
                                    }) => ({
                                        label: item.name,
                                        value: String(item.id),
                                    }),
                                )}
                                label="Tỉnh/TP"
                                mt="md"
                                placeholder="-- Lựa chọn --"
                                {...field}
                            />
                        )}
                    />
                    <TextInput
                        className="w-full"
                        label="Tiền điện"
                        mt="md"
                        placeholder="Tiền điện"
                    />
                    <TextInput
                        className="w-full"
                        label="Tiền nước"
                        mt="md"
                        placeholder="Tiền điện"
                    />
                </Box>
                <Box className="col-span-6">
                    <Controller
                        control={control}
                        name={'managing'}
                        render={({ field }) => (
                            <Select
                                className="col-span-3"
                                data={MANAGING_HOUSE.filter(
                                    (val) => val.id,
                                ).map(
                                    (item: {
                                        id: number | string;
                                        name: string;
                                    }) => ({
                                        label: item.name,
                                        value: String(item.id),
                                    }),
                                )}
                                label="Quản lý"
                                mt="md"
                                placeholder="-- Lựa chọn --"
                                {...field}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name={'district'}
                        render={({ field }) => (
                            <Select
                                className="col-span-3"
                                data={DISTRICT.filter((val) => val.id).map(
                                    (item: {
                                        id: number | string;
                                        name: string;
                                    }) => ({
                                        label: item.name,
                                        value: String(item.id),
                                    }),
                                )}
                                label="Quận/Huyện"
                                mt="md"
                                placeholder="-- Lựa chọn --"
                                {...field}
                            />
                        )}
                    />

                    <TextInput
                        className="w-full"
                        label="Tiền dịch vụ "
                        mt="md"
                        placeholder="Tiền dịch vụ"
                    />

                    <Controller
                        control={control}
                        name={'status'}
                        render={({ field }) => (
                            <Select
                                className="col-span-3"
                                data={STATUS.filter((val) => val.id).map(
                                    (item: {
                                        id: number | string;
                                        name: string;
                                    }) => ({
                                        label: item.name,
                                        value: String(item.id),
                                    }),
                                )}
                                label="Trạng thái"
                                mt="md"
                                placeholder="-- Trạng thái --"
                                {...field}
                            />
                        )}
                    />
                </Box>
            </Box>
            <Box className="mt-4">
                <Text className="text-sm font-medium mb-1">
                    Thông tin thanh toán
                </Text>
                <TextEditor
                    data={dataContent}
                    onChange={(data) => {
                        setValue(`newDetailList.content`, data);
                    }}
                />
            </Box>

            <Flex className="flex justify-end gap-4 mt-10">
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-success-opcity text-success"
                    leftSection={<SaveIcon size={18} strokeWidth={2} />}
                    type="submit"
                >
                    Thêm mới
                </Button>
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-delete-opcity  text-delete"
                    leftSection={<CloseIcon size={18} strokeWidth={2} />}
                    onClick={() => {
                        reset({});
                        onClose();
                    }}
                >
                    Hủy bỏ
                </Button>
            </Flex>
        </form>
    );
};

export default AddHouse;
