import { Box, Button, Flex, Tabs, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import UploadImage from '@src/components/common/UploadImage';
import WrapperBox from '@src/components/common/WrapperBox';
import CloseIcon from '@src/components/common/icon/close-icon';
import SaveIcon from '@src/components/common/icon/save-icon';
import { useAddGeneralQuantityMutation } from '@src/redux/endPoint/general';
import { useGetAllLanguageQuery } from '@src/redux/endPoint/language';
import { GeneralQuantities, GeneralQuantityDetails } from '@src/types/general';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {
    onClose: () => void;
    generalId: number;
};

const AddQuantity = ({ onClose, generalId }: Props) => {
    const { data: languages } = useGetAllLanguageQuery({});
    const [defaultState, setDefaultState] = useState<GeneralQuantities>();
    const [addGeneralQuantity] = useAddGeneralQuantityMutation();

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm<GeneralQuantities>({
        defaultValues: defaultState,
    });

    // set fields productItDetails
    const { fields } = useFieldArray({
        control,
        name: 'quantityDetailsList',
    });

    // set value form data
    useEffect(() => {
        if (languages) {
            const generalDetailArray: GeneralQuantityDetails[] = languages.map(
                (language) => {
                    return {
                        id: '',
                        title: '',
                        description: '',
                        languageId: language.id,
                        languageCode: language.languageCode,
                    };
                },
            );

            setDefaultState({
                generalId: Number(generalId),
                icon: '',
                quantity: 0,
                position: 0,
                quantityDetailsList: generalDetailArray,
            });
            reset({
                quantityDetailsList: generalDetailArray,
            });
        }
    }, [languages, reset]);

    // const [createUser] = useAddUsersMutation();

    const onSubmit = async (data: GeneralQuantities) => {
        try {
            const payload = {
                ...data,
                generalId: generalId,
            };

            await addGeneralQuantity(payload).unwrap();
            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Thêm mới số lượng thành công',
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            notifications.show({
                title: 'Lỗi',
                color: '#ef476f',
                autoClose: 2000,
                message: JSON.stringify(error?.data?.message),
            });
        }
    };
    const getIcon = (icon: string) => {
        setValue('icon', icon);
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box className="grid grid-cols-12 mt-2 gap-6">
                <Box className="col-span-5 ">
                    <Box className="flex flex-col gap-6 mt-[52px]">
                        <WrapperBox title="Thông tin chung">
                            <Box className="flex flex-col gap-4 mt-4">
                                <TextInput
                                    type="number"
                                    className="w-full"
                                    label="Vị trí"
                                    placeholder="Vị trí"
                                    required
                                    {...register('position', {
                                        required: 'Không được để trống !!!',
                                    })}
                                    error={errors?.position?.message as string}
                                    styles={{
                                        input: {
                                            borderColor: errors?.position
                                                ? 'red'
                                                : '#e9ecee',
                                        },
                                    }}
                                />
                                <TextInput
                                    type="number"
                                    className="w-full"
                                    label="Số lượng"
                                    placeholder="Số lượng"
                                    required
                                    {...register('quantity', {
                                        required: 'Không được để trống !!!',
                                    })}
                                    error={errors?.quantity?.message as string}
                                    styles={{
                                        input: {
                                            borderColor: errors?.quantity
                                                ? 'red'
                                                : '#e9ecee',
                                        },
                                    }}
                                />
                            </Box>
                        </WrapperBox>
                    </Box>
                </Box>
                <Box className="flex flex-col col-span-7">
                    {languages && (
                        <Tabs defaultValue={String(languages[0].languageCode)}>
                            <Tabs.List className="inline-flex">
                                {fields.map((field) => {
                                    return (
                                        <Box key={field.id}>
                                            <Tabs.Tab
                                                className="text-sm uppercase"
                                                value={String(
                                                    field.languageCode,
                                                )}
                                            >
                                                {field.languageCode}
                                            </Tabs.Tab>
                                        </Box>
                                    );
                                })}
                            </Tabs.List>
                            {fields.map((field, index) => {
                                return (
                                    <Tabs.Panel
                                        className="flex flex-col gap-6 mt-4"
                                        key={field.id}
                                        value={field.languageCode}
                                    >
                                        <WrapperBox title="Thông tin số lượng">
                                            <Box className="flex flex-col gap-4 mt-4">
                                                <TextInput
                                                    className="w-full"
                                                    label="Tên "
                                                    placeholder="Tên số lượng"
                                                    required
                                                    {...register(
                                                        `quantityDetailsList.${index}.title`,
                                                        {
                                                            required:
                                                                'Không được để trống !!!',
                                                        },
                                                    )}
                                                    error={
                                                        errors
                                                            ?.quantityDetailsList?.[
                                                            index
                                                        ]?.title
                                                            ?.message as string
                                                    }
                                                    styles={{
                                                        input: {
                                                            borderColor: errors
                                                                ?.quantityDetailsList?.[
                                                                index
                                                            ]?.title
                                                                ? 'red'
                                                                : '#e9ecee',
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </WrapperBox>
                                    </Tabs.Panel>
                                );
                            })}
                        </Tabs>
                    )}
                </Box>

                <Box className="col-span-12">
                    <WrapperBox title="Ảnh">
                        <Box className="flex flex-row gap-4 pb-6">
                            <Box>
                                <Box className="text-sm font-semibold mb-3">
                                    Ảnh icon
                                </Box>
                                <Box className="w-full h-full overflow-hidden">
                                    <UploadImage
                                        className="w-80 h-40 object-contain"
                                        getDataFn={getIcon}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </WrapperBox>
                </Box>
            </Box>

            <Flex className="flex justify-end gap-4 mt-6">
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-success-opcity text-success"
                    leftSection={<SaveIcon size={18} strokeWidth={2} />}
                    type="submit"
                >
                    Chỉnh sửa số lượng
                </Button>
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-delete-opcity  text-delete"
                    leftSection={<CloseIcon size={18} strokeWidth={2} />}
                    onClick={onClose}
                >
                    Hủy bỏ
                </Button>
            </Flex>
        </form>
    );
};

export default AddQuantity;
