import { Box, Button, Flex, Tabs, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import UploadImage from '@src/components/common/UploadImage';
import WrapperBox from '@src/components/common/WrapperBox';
import CloseIcon from '@src/components/common/icon/close-icon';
import SaveIcon from '@src/components/common/icon/save-icon';
import { useAddGeneralFieldMutation } from '@src/redux/endPoint/general';
import { useGetAllLanguageQuery } from '@src/redux/endPoint/language';
import { GeneralField, GeneralFieldDetail } from '@src/types/general';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {
    onClose: () => void;
    generalId: number;
};

const AddFiled = ({ onClose, generalId }: Props) => {
    const { data: languages } = useGetAllLanguageQuery({});
    const [defaultState, setDefaultState] = useState<GeneralField>();
    const [addGeneralField] = useAddGeneralFieldMutation();

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm<GeneralField>({
        defaultValues: defaultState,
    });

    // set fields productItDetails
    const { fields } = useFieldArray({
        control,
        name: 'generalFieldDetailList',
    });

    // set value form data
    useEffect(() => {
        if (languages) {
            const generalDetailArray: GeneralFieldDetail[] = languages.map(
                (language) => {
                    return {
                        id: '',
                        title: '',
                        description: '',
                        technology: '',
                        languageId: language.id,
                        languageCode: language.languageCode,
                    };
                },
            );

            setDefaultState({
                generalId: Number(generalId),
                icon: '',
                banner:'',
                linkMedia: '',
                slug: '',
                position: 0,
                generalFieldDetailList: generalDetailArray,
            });
            reset({
                generalFieldDetailList: generalDetailArray,
            });
        }
    }, [languages, reset]);

    // const [createUser] = useAddUsersMutation();

    const onSubmit = async (data: GeneralField) => {
        try {
            const payload = {
                ...data,
                generalId: generalId,
            };

            await addGeneralField(payload).unwrap();
            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Thêm mới lĩnh vực thành công',
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
    const getBanner = (banner: string) => {
        setValue('banner', banner);
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box className="grid grid-cols-12 mt-2 gap-6">
                <Box className="col-span-5 ">
                    <Box className="flex flex-col gap-6 mt-[52px]">
                        <WrapperBox title="Thông tin chung">
                            <Box className="flex flex-col gap-4 mt-4">
                                <TextInput
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
                                    className="w-full"
                                    label="Link video"
                                    placeholder="Link video"
                                    required
                                    {...register('linkMedia', {
                                        required: 'Không được để trống !!!',
                                    })}
                                    error={errors?.linkMedia?.message as string}
                                    styles={{
                                        input: {
                                            borderColor: errors?.linkMedia
                                                ? 'red'
                                                : '#e9ecee',
                                        },
                                    }}
                                />
                                <TextInput
                                    className="w-full"
                                    label="Slug"
                                    placeholder="Slug"
                                    required
                                    {...register('slug', {
                                        required: 'Không được để trống !!!',
                                    })}
                                    error={errors?.slug?.message as string}
                                    styles={{
                                        input: {
                                            borderColor: errors?.slug
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
                                        <WrapperBox title="Thông tin lĩnh vực phát triển">
                                            <Box className="flex flex-col gap-4 mt-4">
                                                <TextInput
                                                    className="w-full"
                                                    label="Tên lĩnh vực phát triển"
                                                    placeholder="Tên lĩnh vực phát triển"
                                                    required
                                                    {...register(
                                                        `generalFieldDetailList.${index}.title`,
                                                        {
                                                            required:
                                                                'Không được để trống !!!',
                                                        },
                                                    )}
                                                    error={
                                                        errors
                                                            ?.generalFieldDetailList?.[
                                                            index
                                                        ]?.title
                                                            ?.message as string
                                                    }
                                                    styles={{
                                                        input: {
                                                            borderColor: errors
                                                                ?.generalFieldDetailList?.[
                                                                index
                                                            ]?.title
                                                                ? 'red'
                                                                : '#e9ecee',
                                                        },
                                                    }}
                                                />
                                                <Textarea
                                                    autosize
                                                    className="w-full"
                                                    label="Nội dung"
                                                    minRows={3}
                                                    placeholder="Nội dung"
                                                    required
                                                    {...register(
                                                        `generalFieldDetailList.${index}.description`,
                                                        {
                                                            required:
                                                                'Không được để trống !!!',
                                                        },
                                                    )}
                                                    error={
                                                        errors
                                                            ?.generalFieldDetailList?.[
                                                            index
                                                        ]?.description
                                                            ?.message as string
                                                    }
                                                    styles={{
                                                        input: {
                                                            borderColor: errors
                                                                ?.generalFieldDetailList?.[
                                                                index
                                                            ]?.description
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
                        <Box className="flex flex-row gap-4 pb-6">
                            <Box>
                                <Box className="text-sm font-semibold mb-3">
                                    Ảnh banner
                                </Box>
                                <Box className="w-full h-full overflow-hidden">
                                    <UploadImage
                                        className="w-80 h-40 object-contain"
                                        getDataFn={getBanner}
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
                    Thêm lĩnh vực phát triển
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

export default AddFiled;
