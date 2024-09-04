/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    Textarea,
} from '@mantine/core';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import SaveIcon from '@src/components/common/icon/save-icon';
import CloseIcon from '@src/components/common/icon/close-icon';
import TextEditor from '@src/components/common/TextEditor';
import UploadImage from '@src/components/common/UploadImage';
import { HOT, STATUS } from '@src/utils/contants';
import { useEditNewsMutation } from '@src/redux/endPoint/news';
import { notifications } from '@mantine/notifications';
import { useGetListNewsGenreQuery } from '@src/redux/endPoint/news_genre';

type Props = {
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    investorDetail: any;
};

const UpdateGroup = ({ onClose, investorDetail }: Props) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const [defaultData, setDefaultData] = useState(investorDetail);

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = useForm({ defaultValues: defaultData as any });

    useEffect(() => {
        if (investorDetail) {
            setDefaultData(investorDetail);
            reset(investorDetail);
            setActiveTab(investorDetail?.investorDetailList[0]?.languageCode);
        }
    }, [reset, investorDetail]);

    useEffect(() => {
        if (investorDetail) {
            setValue('image', investorDetail.image);
        }
    }, [investorDetail]);
    const { fields } = useFieldArray({
        control,
        name: 'investorDetailList',
    });

    const [updateNews] = useEditNewsMutation();

    const { data } = useGetListNewsGenreQuery({
        page: 1,
        pageSize: 20,
        status: 1,
    });

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                name: data.name,
                status: data.status,
            };

            await updateNews(payload).unwrap();

            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Cập nhật nhóm thành công',
            });
        } catch (error: any) {
            notifications.show({
                title: 'Có lỗi',
                color: '#ef476f',
                autoClose: 2000,
                message: JSON.stringify(error?.data?.error),
            });
        }
    };
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box className="w-full flex flex-col sm:grid grid-cols-12 gap-6">
                <Box className="col-span-6">
                    <TextInput
                        className="w-full"
                        label="Tiêu đề"
                        mt="md"
                        placeholder="Tiêu đề"
                        required
                        {...register('title', {
                            required: 'Không được để trống',
                            validate: (value) => {
                                return !!value.trim() || 'Không dược để trống';
                            },
                        })}
                        error={errors?.title?.message as string}
                        styles={{
                            input: {
                                borderColor: errors?.title ? 'red' : '#e9ecee',
                            },
                        }}
                    />
                    <Box className="w-full flex flex-col sm:grid grid-cols-12 gap-6">
                        <Controller
                            control={control}
                            name={'news_category'}
                            render={({ field }) => (
                                <Select
                                    className="col-span-6"
                                    data={selectDemo
                                        .filter((val) => val.id)
                                        .map(
                                            (item: {
                                                id: number | string;
                                                name: string;
                                            }) => ({
                                                label: item.name,
                                                value: String(item.id),
                                            }),
                                        )}
                                    label="Danh mục"
                                    mt="md"
                                    placeholder="-- Chọn danh mục --"
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name={'news_group'}
                            render={({ field }) => (
                                <Select
                                    className="col-span-6"
                                    data={selectDemo
                                        .filter((val) => val.id)
                                        .map(
                                            (item: {
                                                id: number | string;
                                                name: string;
                                            }) => ({
                                                label: item.name,
                                                value: String(item.id),
                                            }),
                                        )}
                                    label="Nhóm tin đăng"
                                    mt="md"
                                    placeholder="-- Chọn nhóm --"
                                    {...field}
                                />
                            )}
                        />
                    </Box>

                    <Fieldset
                        className="rounded-md"
                        legend={
                            <Text className="text-md font-semibold">
                                Công cụ tìm kiếm tối ưu
                            </Text>
                        }
                        mt="md"
                    >
                        <Box className="flex flex-col gap-3">
                            <TextInput
                                className="w-full"
                                label="Meta title"
                                placeholder="Meta title"
                            />
                            <TextInput
                                className="w-full"
                                label="Meta keyword"
                                placeholder="Meta keyword"
                            />
                            <TextInput
                                className="w-full"
                                label="Meta description"
                                placeholder="Meta description"
                            />
                        </Box>
                    </Fieldset>
                </Box>
                <Box className="col-span-6">
                    <TextInput
                        className="w-full"
                        label="Đường dẫn video"
                        mt="md"
                        placeholder="Đường dẫn video"
                    />

                    <Box className="w-full flex flex-col sm:grid grid-cols-12 gap-6">
                        <Controller
                            control={control}
                            name={'room'}
                            render={({ field }) => (
                                <Select
                                    className="col-span-6"
                                    data={selectDemo
                                        .filter((val) => val.id)
                                        .map(
                                            (item: {
                                                id: number | string;
                                                name: string;
                                            }) => ({
                                                label: item.name,
                                                value: String(item.id),
                                            }),
                                        )}
                                    label="Phòng"
                                    mt="md"
                                    placeholder="-- Chọn Phòng --"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name={'tower'}
                            render={({ field }) => (
                                <Select
                                    className="col-span-6"
                                    data={selectDemo
                                        .filter((val) => val.id)
                                        .map(
                                            (item: {
                                                id: number | string;
                                                name: string;
                                            }) => ({
                                                label: item.name,
                                                value: String(item.id),
                                            }),
                                        )}
                                    label="Tòa nhà"
                                    mt="md"
                                    placeholder="-- Tòa nhà --"
                                    {...field}
                                />
                            )}
                        />
                    </Box>

                    <Textarea
                        className="w-full"
                        label="Mô tả"
                        mt="md"
                        placeholder="Mô tả"
                    />

                    <Box className="w-[180px] h-[150px]">
                        <Text className="text-sm font-medium mt-4 mb-1">
                            Hình ảnh
                        </Text>
                        <Box className="w-full h-full rounded-lg overflow-hidden">
                            <UploadImage
                                className="w-full h-full object-contain"
                                getDataFn={getImage}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box className="col-span-12 mt-4">
                    <Text className="text-sm font-medium mb-1">Nội dung</Text>
                    <TextEditor
                        data={content}
                        onChange={(data) => {
                            setContent(data);
                        }}
                    />
                </Box>
            </Box>

            <Flex className="flex justify-end gap-4 mt-10">
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-success-opcity text-success"
                    leftSection={<SaveIcon size={18} strokeWidth={2} />}
                    type="submit"
                >
                    Cập nhật
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

export default UpdateGroup;
