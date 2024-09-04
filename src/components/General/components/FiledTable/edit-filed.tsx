import { Box, Button, Flex, Tabs, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import UploadImage from '@src/components/common/UploadImage';
import WrapperBox from '@src/components/common/WrapperBox';
import CloseIcon from '@src/components/common/icon/close-icon';
import SaveIcon from '@src/components/common/icon/save-icon';
import {
    useEditOneGeneralFieldMutation,
    useGetOneGeneralFieldQuery,
} from '@src/redux/endPoint/general';
import { useGetAllLanguageQuery } from '@src/redux/endPoint/language';
import { GeneralField, GeneralFieldDetail } from '@src/types/general';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {
    onClose: () => void;
    filedId: number;
};

const EditFiled = ({ onClose, filedId }: Props) => {
    const { data: languages } = useGetAllLanguageQuery({});
    const [defaultState, setDefaultState] = useState<GeneralField>();
    const { data: generalField } = useGetOneGeneralFieldQuery(filedId);
    const [editOneGeneralField] = useEditOneGeneralFieldMutation();
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
            const generalFieldDetailsArray: GeneralFieldDetail[] =
                languages.map((language) => {
                    return {
                        id: '',
                        title: '',
                        description: '',
                        languageId: language.id,
                        languageCode: language.languageCode,
                    };
                });

            if (generalField) {
                const combinedGeneralFieldDetailList = [
                    ...generalField.generalFieldDetailList,
                ];
                generalFieldDetailsArray.map((generalFieldDetail) => {
                    const isDuplicate = combinedGeneralFieldDetailList.some(
                        (existingDetail) => {
                            return (
                                existingDetail.languageId ===
                                    generalFieldDetail.languageId &&
                                existingDetail.languageCode ===
                                    generalFieldDetail.languageCode
                            );
                        },
                    );

                    if (!isDuplicate) {
                        combinedGeneralFieldDetailList.push(generalFieldDetail);
                    }
                });

                setDefaultState({
                    generalId: generalField.generalId,
                    icon: generalField.icon,
                    banner: generalField.banner,
                    linkMedia: generalField.linkMedia,
                    slug: generalField.slug,
                    position: generalField.position,
                    generalFieldDetailList: combinedGeneralFieldDetailList,
                });

                reset({
                    generalFieldDetailList: combinedGeneralFieldDetailList,
                });
            }
        }
    }, [languages, generalField, reset, filedId]);

    useEffect(() => {
        if (generalField) {
            setValue('icon', generalField.icon);
            setValue('banner', generalField.banner);
        }
    }, [generalField]);
    const onSubmit = async (data: GeneralField) => {
        try {
            const payload = {
                ...data,
                id: filedId,
            };

            await editOneGeneralField(payload).unwrap();
            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Chỉnh sửa lĩnh vực thành công',
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
        generalField && (
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
                                        defaultValue={generalField.position}
                                        required
                                        {...register('position', {
                                            required: 'Không được để trống !!!',
                                        })}
                                        error={
                                            errors?.position?.message as string
                                        }
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
                                        defaultValue={generalField.linkMedia}
                                        required
                                        {...register('linkMedia', {
                                            required: 'Không được để trống !!!',
                                        })}
                                        error={
                                            errors?.linkMedia?.message as string
                                        }
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
                                        defaultValue={generalField.slug}
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
                            <Tabs
                                defaultValue={String(languages[0].languageCode)}
                            >
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
                                                                borderColor:
                                                                    errors
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
                                                                borderColor:
                                                                    errors
                                                                        ?.generalFieldDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.description
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
                                            setData={generalField.icon}
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
                                            setData={generalField.banner}
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
                        Chỉnh sửa lĩnh vực
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
        )
    );
};

export default EditFiled;
