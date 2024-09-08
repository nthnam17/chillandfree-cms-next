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
import { notifications } from '@mantine/notifications';

type Props = {
    onClose: () => void;
};

const AddCategory = ({ onClose }: Props) => {
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
            status: '1',
            title: '',
            description: '',
            slug: '',
        },
        mode: 'onTouched',
    });

    // const [createNewsGroup] = useAddNewsGroupMutation();
    const onSubmit = async (data: any) => {
        try {
            // const payload = {
            //     ...data,
            //     status: data.status ? Number(data.status) : 1,
            // };

            // await createNewsGroup(payload).unwrap();

            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Thêm mới nhóm thành công',
            });
        } catch (error: any) {
            notifications.show({
                title: 'Có lỗi!',
                color: '#ef476f',
                autoClose: 2000,
                message: JSON.stringify(error?.data?.error),
            });
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box className="w-full flex flex-col sm:grid grid-cols-12 gap-6">
                <Box className="col-span-12">
                    <TextInput
                        className="w-full"
                        label="Tên danh mục"
                        mt="md"
                        placeholder="Tên danh mục"
                        {...register('title', {
                            required: 'Tên danh mục không được để trống',
                            validate: (value) => {
                                return (
                                    !!value.trim() ||
                                    'Tên danh mục không được để trống'
                                );
                            },
                        })}
                        error={errors?.title?.message as string}
                        styles={{
                            input: {
                                borderColor: errors?.title ? 'red' : '#e9ecee',
                            },
                        }}
                    />
                    <TextInput
                        className="w-full"
                        label="Đường dẫn"
                        mt="md"
                        placeholder="Đường dẫn"
                        {...register('slug', {
                            required: 'Đường dẫn không được để trống',
                            validate: (value) => {
                                return (
                                    !!value.trim() ||
                                    'Đường dẫn không được để trống'
                                );
                            },
                        })}
                        error={errors?.slug?.message as string}
                        styles={{
                            input: {
                                borderColor: errors?.slug ? 'red' : '#e9ecee',
                            },
                        }}
                    />
                    <Textarea
                        className="w-full"
                        label="Mô tả"
                        mt="md"
                        placeholder="Mô tả"
                        {...register('description')}
                    />
                    <TextInput
                        className="w-full"
                        label="Vị trí"
                        mt="md"
                        placeholder="Vị trí"
                        {...register('slug')}
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

            <Flex className="flex justify-end gap-4 mt-10 p-5">
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-success text-white"
                    leftSection={<SaveIcon size={18} strokeWidth={2} />}
                    type="submit"
                >
                    Thêm mới
                </Button>
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-delete  text-white"
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

export default AddCategory;
