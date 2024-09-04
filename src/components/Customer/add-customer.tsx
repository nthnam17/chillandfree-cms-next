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

const AddCustomer = ({ onClose, investorDetailList }: Props) => {
    const [activeTab, setActiveTab] = useState<string | null>(
        investorDetailList[0]?.languageCode,
    );

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
        },
        mode: 'onTouched',
    });

    const { fields } = useFieldArray({
        control,
        name: 'investorDetailList',
    });

    const [createNews] = useAddNewsMutation();
    const { data } = useGetListNewsGenreQuery({
        page: 1,
        pageSize: 20,
        status: 1,
    });
    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                status: data.status ? Number(data.status) : 1,
            };

            await createNews(payload).unwrap();

            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Thêm mới tin tức thành công',
            });
        } catch (error: any) {
            notifications.show({
                title: 'Lỗi',
                color: '#ef476f',
                autoClose: 2000,
                message: JSON.stringify(error?.data?.error),
            });
        }
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
                        label="Họ và Tên"
                        mt="md"
                        placeholder="Họ và Tên"
                    />
                    <TextInput
                        className="w-full"
                        label="Email"
                        mt="md"
                        placeholder="Email"
                    />
                    <TextInput
                        className="w-full"
                        label="Ngày sinh"
                        mt="md"
                        placeholder="Ngày sinh"
                    />
                </Box>
                <Box className="col-span-6">
                    <TextInput
                        className="w-full"
                        label="Số diện thoại"
                        mt="md"
                        placeholder="Số diện thoại"
                    />

                    <TextInput
                        className="w-full"
                        label="CCCD"
                        mt="md"
                        placeholder="Căn cước công dân"
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

export default AddCustomer;
