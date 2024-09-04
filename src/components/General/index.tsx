/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Breadcrumbs,
    Button,
    Tabs,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core';
import Link from 'next/link';
import CommonBox from './common-box';
import { useFieldArray, useForm } from 'react-hook-form';
import SaveIcon from '../common/icon/save-icon';
// import UploadImage from '../common/UploadImage';
import AddIcon from '../common/icon/add-icon';
import { useGetAllLanguageQuery } from '@src/redux/endPoint/language';
import {
    General,
    GeneralDetail,
    // GeneralField,
    // GeneralFieldDetail,
    // GeneralQuantityDetails,
} from '@src/types/general';
import { useEffect, useState } from 'react';
import {
    useEditGeneralMutation,
    useGetGeneralQuery,
} from '@src/redux/endPoint/general';
import { notifications } from '@mantine/notifications';
import UploadImage from '../common/UploadImage';
import WrapperBox from '../common/WrapperBox';
import FiledTable from './components/FiledTable';
import QuantityTable from './components/QuantityTable';

const items: JSX.Element[] = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Chung', href: '/general-setting/general' },
].map((item, index) => (
    <Box key={index}>
        <Link
            className="text-sm font-medium text-primary-gray no-underline"
            href={item.href as string}
        >
            {item.title}
        </Link>
    </Box>
));

const General = () => {
    const { data: languages } = useGetAllLanguageQuery({});
    const [defaultState, setDefaultState] = useState<General>();

    const { data: dataGeneral } = useGetGeneralQuery();
    const [editGeneral] = useEditGeneralMutation();

    // const [generalFiledsDetails, setGeneralFiledsDetails] =
    //     useState<GeneralFieldDetail[]>();
    // const [generalQuantityDetails, setGeneralQuantityDetails] =
    //     useState<GeneralQuantityDetails[]>();
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
        watch,
        getValues,
    } = useForm<General>({
        defaultValues: defaultState,
    });

    // set fields generalDetailList
    const { fields } = useFieldArray({
        control,
        name: 'generalDetailList',
    });

    // set field sociaMedias
    const {
        fields: fieldsSocialMedias,
        remove: removeSocialMedias,
        append: appendSocialMedias,
    } = useFieldArray({
        control,
        name: 'socialMediaList',
    });

    // set value form data
    useEffect(() => {
        if (languages) {
            const generalDetailsArray: GeneralDetail[] = languages.map(
                (language) => {
                    return {
                        id: '',
                        name: '',
                        address: '',
                        title: '',
                        subDescription: '',
                        description: '',
                        aboutTitle: '',
                        aboutDescription: '',
                        serviceTitle: '',
                        serviceDescription: '',
                        partnerTitle: '',
                        partnerDescription: '',
                        contactTitle: '',
                        contactDescription: '',
                        metaTitle: '',
                        metaDescription: '',
                        metaKeyword: '',
                        metaSlug: '',
                        languageId: language.id,
                        languageCode: language.languageCode,
                    };
                },
            );

            if (dataGeneral) {
                const combinedGeneralDetailList = [
                    ...dataGeneral.generalDetailList,
                ];
                generalDetailsArray.forEach((newDetail) => {
                    const isDuplicate = combinedGeneralDetailList.some(
                        (existingDetail) => {
                            return (
                                existingDetail.languageId ===
                                    newDetail.languageId &&
                                existingDetail.languageCode ===
                                    newDetail.languageCode
                            );
                        },
                    );

                    if (!isDuplicate) {
                        combinedGeneralDetailList.push(newDetail);
                    }
                });
                setDefaultState({
                    id: dataGeneral.id,
                    generalDetailList: combinedGeneralDetailList,
                    socialMediaList: dataGeneral.socialMediaList,
                    email: dataGeneral.email,
                    phone: dataGeneral.phone,
                    bodyHtml: dataGeneral.bodyHtml,
                    scriptHtml: dataGeneral.scriptHtml,
                    map: dataGeneral.map,
                    telegramGroupChatId: dataGeneral.telegramGroupChatId,
                    telegramToken: dataGeneral.telegramToken,
                    logo: dataGeneral.logo,
                    logoFooter: dataGeneral.logoFooter,
                    favicon: dataGeneral.favicon,
                    aboutBanner: dataGeneral.aboutBanner,
                    partnerBanner: dataGeneral.partnerBanner,
                    serviceBanner: dataGeneral.serviceBanner,
                    contactBanner: dataGeneral.contactBanner,
                });
                setValue('socialMediaList', [...dataGeneral.socialMediaList]);
                reset({
                    generalDetailList: combinedGeneralDetailList,
                    socialMediaList: dataGeneral.socialMediaList,
                });
            }
        }
    }, [languages, reset, dataGeneral]);

    useEffect(() => {
        if (dataGeneral) {
            setValue('logo', dataGeneral.logo);
            setValue('logoFooter', dataGeneral.logoFooter);
            setValue('favicon', dataGeneral.favicon);
            setValue('aboutBanner', dataGeneral.aboutBanner);
            setValue('partnerBanner', dataGeneral.partnerBanner);
            setValue('serviceBanner', dataGeneral.serviceBanner);
            setValue('contactBanner', dataGeneral.contactBanner);
        }
    }, [dataGeneral]);
    const handleAppendSocialMedias = () => {
        if (dataGeneral) {
            appendSocialMedias({
                name: '',
                link: '',
                icon: '',
                id: '',
            });
        }
    };

    // set field GeneralFields
    // const {
    //     fields: fieldsGeneralFields,
    //     remove: removeGeneralFields,
    //     // append: appendGeneralFields,
    // } = useFieldArray({
    //     control,
    //     name: 'generalField',
    // });

    // useEffect(() => {
    //     if (languages) {
    //         const generalFieldDetailsArray: GeneralFieldDetail[] =
    //             languages.map((language) => {
    //                 return {
    //                     title: '',
    //                     description: '',
    //                     languageId: language.id,
    //                     descriptionLang: language.description,
    //                     languageCode: language.languageCode,
    //                 };
    //             });

    //         setGeneralFiledsDetails(generalFieldDetailsArray);
    //     }
    // }, [languages, watch('generalField')]);

    // const handleAppendGeneralFields = () => {
    //     setValue('generalField', [
    //         ...(getValues().generalField || []),
    //         {
    //             icon: '',
    //             linkMedia: '',
    //             position: 0,
    //             slug: '',
    //             generalFieldDetail: generalFiledsDetails || [],
    //         },
    //     ]);
    // };

    // // set field GeneralQuantities
    // const {
    //     fields: fieldsQuantities,
    //     remove: removeQuantities,
    //     // append: appendQuantities,
    // } = useFieldArray({
    //     control,
    //     name: 'generalQuantities',
    // });

    // useEffect(() => {
    //     if (languages) {
    //         const generalQuantityDetailsArray: GeneralQuantityDetails[] =
    //             languages.map((language) => {
    //                 return {
    //                     title: '',
    //                     languageId: language.id,
    //                     descriptionLang: language.description,
    //                     languageCode: language.languageCode,
    //                 };
    //             });

    //         setGeneralQuantityDetails(generalQuantityDetailsArray);
    //     }
    // }, [languages, watch('generalQuantities')]);

    // const handleAppendQuantities = () => {
    //     setValue('generalQuantities', [
    //         ...(getValues().generalQuantities || []),
    //         {
    //             icon: '',
    //             position: 0,
    //             quantity: 0,
    //             quantityDetails: generalQuantityDetails || [],
    //         },
    //     ]);
    // };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (data: General) => {
        console.log(data, 'data');
        try {
            if (dataGeneral) {
                const dataSubmit = {
                    ...data,
                    id: dataGeneral.id,
                };
                await editGeneral(dataSubmit).unwrap();
                notifications.show({
                    title: 'Thành công',
                    color: '#06d6a0',
                    autoClose: 2000,
                    message: 'Sửa thông tin thành công',
                });
            }
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

    const getLogo = (logo: string) => {
        setValue('logo', logo);
    };
    const getLogoFooter = (logoFooter: string) => {
        setValue('logoFooter', logoFooter);
    };
    const getFavicon = (favicon: string) => {
        setValue('favicon', favicon);
    };
    const getAboutBanner = (aboutBanner: string) => {
        setValue('aboutBanner', aboutBanner);
    };
    const getPartnerBanner = (partnerBanner: string) => {
        setValue('partnerBanner', partnerBanner);
    };
    const getServiceBanner = (serviceBanner: string) => {
        setValue('serviceBanner', serviceBanner);
    };
    const getContactBanner = (contactBanner: string) => {
        setValue('contactBanner', contactBanner);
    };
    return (
        languages && (
            <Box className="mx-10 mb-24 px-6 py-8 bg-white shadow-sm rounded-xl max-h-max border border-dashed border-primary-border">
                <Box>
                    <Title className="text-lg text-primary-black uppercase">
                        Cài đặt thông tin website
                    </Title>
                    <Breadcrumbs
                        mt="xs"
                        separator={
                            <Box className="w-1 h-1 rounded-full bg-primary-gray" />
                        }
                    >
                        {items}
                    </Breadcrumbs>
                </Box>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    {dataGeneral && (
                        <Box className="grid grid-cols-12 mt-2 gap-6">
                            <Box className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5  mt-[58px] ">
                                <Box className="flex flex-col gap-6">
                                    <CommonBox title="Liên hệ">
                                        <Box className="flex flex-col gap-4 mt-4">
                                            <TextInput
                                                className="w-full"
                                                label="Map"
                                                placeholder="Map"
                                                defaultValue={dataGeneral.map}
                                                required
                                                {...register('map', {
                                                    required:
                                                        'Không được để trống !!!',
                                                })}
                                                error={
                                                    errors?.map
                                                        ?.message as string
                                                }
                                                styles={{
                                                    input: {
                                                        borderColor: errors?.map
                                                            ? 'red'
                                                            : '#e9ecee',
                                                    },
                                                }}
                                            />
                                            <TextInput
                                                className="w-full"
                                                label="Email"
                                                placeholder="Email"
                                                defaultValue={dataGeneral.email}
                                                required
                                                {...register('email', {
                                                    required:
                                                        'Không được để trống !!!',
                                                })}
                                                error={
                                                    errors?.email
                                                        ?.message as string
                                                }
                                                styles={{
                                                    input: {
                                                        borderColor:
                                                            errors?.email
                                                                ? 'red'
                                                                : '#e9ecee',
                                                    },
                                                }}
                                            />

                                            <TextInput
                                                className="w-full"
                                                label="SĐT"
                                                placeholder="SĐT"
                                                required
                                                defaultValue={dataGeneral.phone}
                                                {...register('phone', {
                                                    required:
                                                        'Không được để trống !!!',
                                                })}
                                                error={
                                                    errors?.phone
                                                        ?.message as string
                                                }
                                                styles={{
                                                    input: {
                                                        borderColor:
                                                            errors?.phone
                                                                ? 'red'
                                                                : '#e9ecee',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </CommonBox>

                                    <CommonBox title="Mạng xã hội">
                                        {dataGeneral.socialMediaList && (
                                            <>
                                                <Box className="flex flex-col gap-4 mt-4">
                                                    {getValues()
                                                        .socialMediaList &&
                                                        fieldsSocialMedias.map(
                                                            (filed, index) => {
                                                                return (
                                                                    <Box
                                                                        className="flex gap-4"
                                                                        key={
                                                                            filed.id +
                                                                            276
                                                                        }
                                                                    >
                                                                        <Box className="w-12 h-12 rounded-full">
                                                                            <Box className="text-sm font-semibold mb-1">
                                                                                Icon
                                                                            </Box>
                                                                            <Box className="w-full h-full overflow-hidden rounded-full">
                                                                                <UploadImage
                                                                                    className="w-full h-full object-contain"
                                                                                    getDataFn={(
                                                                                        icon: string,
                                                                                    ) => {
                                                                                        setValue(
                                                                                            `socialMediaList.${index}.icon`,
                                                                                            icon,
                                                                                        );
                                                                                    }}
                                                                                    setData={watch(
                                                                                        `socialMediaList.${index}.icon`,
                                                                                    )}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="flex-1 flex gap-3 items-center">
                                                                            <TextInput
                                                                                className="w-full"
                                                                                label="Mạng xã hội"
                                                                                placeholder="Mạng xã hội"
                                                                                required
                                                                                {...register(
                                                                                    `socialMediaList.${index}.name` as const,
                                                                                    {
                                                                                        required:
                                                                                            'Không được để trống !!!',
                                                                                    },
                                                                                )}
                                                                                error={
                                                                                    errors
                                                                                        ?.socialMediaList?.[
                                                                                        index
                                                                                    ]
                                                                                        ?.name
                                                                                        ?.message as string
                                                                                }
                                                                                styles={{
                                                                                    input: {
                                                                                        borderColor:
                                                                                            errors
                                                                                                ?.socialMediaList?.[
                                                                                                index
                                                                                            ]
                                                                                                ?.name
                                                                                                ? 'red'
                                                                                                : '#e9ecee',
                                                                                    },
                                                                                }}
                                                                            />
                                                                            <TextInput
                                                                                className="w-full"
                                                                                label="Link"
                                                                                placeholder="Link"
                                                                                required
                                                                                {...register(
                                                                                    `socialMediaList.${index}.link` as const,
                                                                                    {
                                                                                        required:
                                                                                            'Không được để trống !!!',
                                                                                    },
                                                                                )}
                                                                                error={
                                                                                    errors
                                                                                        ?.socialMediaList?.[
                                                                                        index
                                                                                    ]
                                                                                        ?.link
                                                                                        ?.message as string
                                                                                }
                                                                                styles={{
                                                                                    input: {
                                                                                        borderColor:
                                                                                            errors
                                                                                                ?.socialMediaList?.[
                                                                                                index
                                                                                            ]
                                                                                                ?.link
                                                                                                ? 'red'
                                                                                                : '#e9ecee',
                                                                                    },
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                        <Box
                                                                            className="cursor-pointer"
                                                                            onClick={() =>
                                                                                removeSocialMedias(
                                                                                    index,
                                                                                )
                                                                            }
                                                                        >
                                                                            ❌
                                                                        </Box>
                                                                    </Box>
                                                                );
                                                            },
                                                        )}
                                                </Box>
                                                <Box
                                                    className="w-10 h-10 mt-4 cursor-pointer flex items-center justify-center bg-success-opcity text-success rounded-lg"
                                                    onClick={
                                                        handleAppendSocialMedias
                                                    }
                                                >
                                                    <AddIcon size={16} />
                                                </Box>{' '}
                                            </>
                                        )}
                                    </CommonBox>

                                    <CommonBox title="Tích hợp">
                                        <Box className="flex flex-col gap-4 mt-4">
                                            <Textarea
                                                autosize
                                                className="w-full"
                                                label="Các thẻ html chèn vào head "
                                                minRows={3}
                                                defaultValue={
                                                    dataGeneral.scriptHtml
                                                }
                                                placeholder="Các thẻ html chèn vào head "
                                                {...register('scriptHtml', {
                                                    required:
                                                        'Không được để trống !!!',
                                                })}
                                                error={
                                                    errors?.scriptHtml
                                                        ?.message as string
                                                }
                                                styles={{
                                                    input: {
                                                        borderColor:
                                                            errors?.scriptHtml
                                                                ? 'red'
                                                                : '#e9ecee',
                                                    },
                                                }}
                                            />
                                            <Textarea
                                                autosize
                                                className="w-full"
                                                label="Các thẻ html chèn vào body"
                                                defaultValue={
                                                    dataGeneral.bodyHtml
                                                }
                                                minRows={3}
                                                placeholder="Các thẻ html chèn vào body"
                                                {...register('bodyHtml', {
                                                    required:
                                                        'Không được để trống !!!',
                                                })}
                                                error={
                                                    errors?.bodyHtml
                                                        ?.message as string
                                                }
                                                styles={{
                                                    input: {
                                                        borderColor:
                                                            errors?.bodyHtml
                                                                ? 'red'
                                                                : '#e9ecee',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </CommonBox>
                                    <CommonBox title="Tích hợp Telegram">
                                        <Box className="flex flex-col gap-4 mt-4">
                                            <Textarea
                                                autosize
                                                className="w-full"
                                                label="ID nhóm chat telegram"
                                                minRows={3}
                                                defaultValue={
                                                    dataGeneral.telegramGroupChatId
                                                }
                                                placeholder="ID nhóm chat telegram"
                                                {...register(
                                                    'telegramGroupChatId',
                                                    {
                                                        required:
                                                            'Không được để trống !!!',
                                                    },
                                                )}
                                                error={
                                                    errors?.telegramGroupChatId
                                                        ?.message as string
                                                }
                                                styles={{
                                                    input: {
                                                        borderColor:
                                                            errors?.telegramGroupChatId
                                                                ? 'red'
                                                                : '#e9ecee',
                                                    },
                                                }}
                                            />
                                            <Textarea
                                                autosize
                                                className="w-full"
                                                label="Token telegram"
                                                defaultValue={
                                                    dataGeneral.telegramToken
                                                }
                                                minRows={3}
                                                placeholder="Token telegram"
                                                {...register('telegramToken', {
                                                    required:
                                                        'Không được để trống !!!',
                                                })}
                                                error={
                                                    errors?.telegramGroupChatId
                                                        ?.message as string
                                                }
                                                styles={{
                                                    input: {
                                                        borderColor:
                                                            errors?.telegramGroupChatId
                                                                ? 'red'
                                                                : '#e9ecee',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </CommonBox>

                                    {/* <CommonBox title="Lĩnh vực phát triển">
                                <Box className="flex flex-col gap-4 mt-4">
                                    {fieldsGeneralFields.map((field, index) => {
                                        return (
                                            <CommonBox
                                                key={field.id + 999}
                                                title={''}
                                            >
                                                <Box className="flex gap-4">
                                                    <Box className="w-12 h-12">
                                                        <Box className="text-sm font-semibold mb-1">
                                                            icon
                                                        </Box>
                                                        <Box className="w-full h-full overflow-hidden">
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex-1 flex gap-3 items-center">
                                                        <TextInput
                                                            className="w-full"
                                                            label="Vị trí"
                                                            placeholder="Vị trí"
                                                            required
                                                            {...register(
                                                                `generalField.${index}.position` as const,
                                                                {
                                                                    required:
                                                                        'Không được để trống !!!',
                                                                },
                                                            )}
                                                            error={
                                                                errors
                                                                    ?.generalField?.[
                                                                    index
                                                                ]?.position
                                                                    ?.message as string
                                                            }
                                                            styles={{
                                                                input: {
                                                                    borderColor:
                                                                        errors
                                                                            ?.generalField?.[
                                                                            index
                                                                        ]
                                                                            ?.position
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
                                                            {...register(
                                                                `generalField.${index}.linkMedia`,
                                                                {
                                                                    required:
                                                                        'Không được để trống !!!',
                                                                },
                                                            )}
                                                            error={
                                                                errors
                                                                    ?.generalField?.[
                                                                    index
                                                                ]?.linkMedia
                                                                    ?.message as string
                                                            }
                                                            styles={{
                                                                input: {
                                                                    borderColor:
                                                                        errors
                                                                            ?.generalField?.[
                                                                            index
                                                                        ]
                                                                            ?.linkMedia
                                                                            ? 'red'
                                                                            : '#e9ecee',
                                                                },
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            removeGeneralFields(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        ❌
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <TextInput
                                                        className="w-full"
                                                        label="Đường dẫn"
                                                        placeholder="Đường dẫn"
                                                        required
                                                        {...register(
                                                            `generalField.${index}.slug`,
                                                            {
                                                                required:
                                                                    'Không được để trống !!!',
                                                            },
                                                        )}
                                                        error={
                                                            errors
                                                                ?.generalField?.[
                                                                index
                                                            ]?.slug
                                                                ?.message as string
                                                        }
                                                        styles={{
                                                            input: {
                                                                borderColor:
                                                                    errors
                                                                        ?.generalField?.[
                                                                        index
                                                                    ]?.slug
                                                                        ? 'red'
                                                                        : '#e9ecee',
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Box className="pt-3">
                                                    {languages && (
                                                        <Tabs
                                                            defaultValue={String(
                                                                languages[0]
                                                                    .languageCode,
                                                            )}
                                                        >
                                                            <Tabs.List className="inline-flex">
                                                                {field.generalFieldDetail.map(
                                                                    (
                                                                        fieldDetail,
                                                                    ) => {
                                                                        const uniqueKey = `${field.id}-${fieldDetail.languageCode}-123123`;
                                                                        return (
                                                                            <Box
                                                                                key={
                                                                                    uniqueKey
                                                                                }
                                                                            >
                                                                                <Tabs.Tab
                                                                                    className="text-sm uppercase"
                                                                                    value={String(
                                                                                        fieldDetail.languageCode,
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        fieldDetail.languageCode
                                                                                    }
                                                                                </Tabs.Tab>
                                                                            </Box>
                                                                        );
                                                                    },
                                                                )}
                                                            </Tabs.List>
                                                            {field.generalFieldDetail.map(
                                                                (
                                                                    fieldDetail,
                                                                    indexFieldDetail,
                                                                ) => {
                                                                    const uniqueKey = `${field.id}-${fieldDetail.languageCode}-123123`;
                                                                    return (
                                                                        <Tabs.Panel
                                                                            className="flex flex-col gap-6 mt-4"
                                                                            key={
                                                                                uniqueKey
                                                                            }
                                                                            value={
                                                                                fieldDetail.languageCode
                                                                            }
                                                                        >
                                                                            <CommonBox title="Thông tin">
                                                                                <Box className="flex flex-col gap-4 mt-4">
                                                                                    <TextInput
                                                                                        className="w-full"
                                                                                        label="Tên lĩnh vực"
                                                                                        placeholder="Tên lĩnh vực"
                                                                                        required
                                                                                        {...register(
                                                                                            `generalField.${index}.generalFieldDetail.${indexFieldDetail}.title`,
                                                                                            {
                                                                                                required:
                                                                                                    'Không được để trống !!!',
                                                                                            },
                                                                                        )}
                                                                                        error={
                                                                                            errors
                                                                                                ?.generalField?.[
                                                                                                index
                                                                                            ]
                                                                                                ?.generalFieldDetail?.[
                                                                                                indexFieldDetail
                                                                                            ]
                                                                                                ?.title
                                                                                                ?.message as string
                                                                                        }
                                                                                        styles={{
                                                                                            input: {
                                                                                                borderColor:
                                                                                                    errors
                                                                                                        ?.generalField?.[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.generalFieldDetail?.[
                                                                                                        indexFieldDetail
                                                                                                    ]
                                                                                                        ?.title
                                                                                                        ? 'red'
                                                                                                        : '#e9ecee',
                                                                                            },
                                                                                        }}
                                                                                    />
                                                                                    <Textarea
                                                                                        autosize
                                                                                        className="w-full"
                                                                                        label="Nội dung"
                                                                                        minRows={
                                                                                            3
                                                                                        }
                                                                                        placeholder="Nội dung"
                                                                                        required
                                                                                        {...register(
                                                                                            `generalField.${index}.generalFieldDetail.${indexFieldDetail}.description`,
                                                                                            {
                                                                                                required:
                                                                                                    'Không được để trống !!!',
                                                                                            },
                                                                                        )}
                                                                                        error={
                                                                                            errors
                                                                                                ?.generalField?.[
                                                                                                index
                                                                                            ]
                                                                                                ?.generalFieldDetail?.[
                                                                                                indexFieldDetail
                                                                                            ]
                                                                                                ?.description
                                                                                                ?.message as string
                                                                                        }
                                                                                        styles={{
                                                                                            input: {
                                                                                                borderColor:
                                                                                                    errors
                                                                                                        ?.generalField?.[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.generalFieldDetail?.[
                                                                                                        indexFieldDetail
                                                                                                    ]
                                                                                                        ?.description
                                                                                                        ? 'red'
                                                                                                        : '#e9ecee',
                                                                                            },
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            </CommonBox>
                                                                        </Tabs.Panel>
                                                                    );
                                                                },
                                                            )}
                                                        </Tabs>
                                                    )}
                                                </Box>
                                            </CommonBox>
                                        );
                                    })}
                                </Box>
                                <Box
                                    className="w-10 h-10 mt-4 cursor-pointer flex items-center justify-center bg-success-opcity text-success rounded-lg"
                                    onClick={handleAppendGeneralFields}
                                >
                                    <AddIcon size={16} />
                                </Box>
                            </CommonBox> */}
                                    {/* <CommonBox title="Số lượng của chúng tôi">
                                <Box className="flex flex-col gap-4 mt-4">
                                    {fieldsQuantities.map((field, index) => {
                                        return (
                                            <CommonBox
                                                key={field.id + 999}
                                                title={''}
                                            >
                                                <Box className="flex gap-4">
                                                    <Box className="w-12 h-12">
                                                        <Box className="text-sm font-semibold mb-1">
                                                            icon
                                                        </Box>
                                                        <Box className="w-full h-full overflow-hidden">
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex-1 flex gap-3 items-center">
                                                        <TextInput
                                                            className="w-full"
                                                            label="Vị trí"
                                                            placeholder="Vị trí"
                                                            required
                                                            {...register(
                                                                `generalQuantities.${index}.position` as const,
                                                                {
                                                                    required:
                                                                        'Không được để trống !!!',
                                                                },
                                                            )}
                                                            error={
                                                                errors
                                                                    ?.generalQuantities?.[
                                                                    index
                                                                ]?.position
                                                                    ?.message as string
                                                            }
                                                            styles={{
                                                                input: {
                                                                    borderColor:
                                                                        errors
                                                                            ?.generalQuantities?.[
                                                                            index
                                                                        ]
                                                                            ?.position
                                                                            ? 'red'
                                                                            : '#e9ecee',
                                                                },
                                                            }}
                                                        />
                                                        <TextInput
                                                            className="w-full"
                                                            label="Số lượng"
                                                            placeholder="Số lượng"
                                                            required
                                                            {...register(
                                                                `generalQuantities.${index}.quantity`,
                                                                {
                                                                    required:
                                                                        'Không được để trống !!!',
                                                                },
                                                            )}
                                                            error={
                                                                errors
                                                                    ?.generalQuantities?.[
                                                                    index
                                                                ]?.quantity
                                                                    ?.message as string
                                                            }
                                                            styles={{
                                                                input: {
                                                                    borderColor:
                                                                        errors
                                                                            ?.generalQuantities?.[
                                                                            index
                                                                        ]
                                                                            ?.quantity
                                                                            ? 'red'
                                                                            : '#e9ecee',
                                                                },
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            removeQuantities(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        ❌
                                                    </Box>
                                                </Box>
                                                <Box className="pt-3">
                                                    {languages && (
                                                        <Tabs
                                                            defaultValue={String(
                                                                languages[0]
                                                                    .languageCode,
                                                            )}
                                                        >
                                                            <Tabs.List className="inline-flex">
                                                                {field.quantityDetails.map(
                                                                    (
                                                                        fieldDetail,
                                                                    ) => {
                                                                        const uniqueKey = `${field.id}-${fieldDetail.languageCode}-123123`;
                                                                        return (
                                                                            <Box
                                                                                key={
                                                                                    uniqueKey
                                                                                }
                                                                            >
                                                                                <Tabs.Tab
                                                                                    className="text-sm uppercase"
                                                                                    value={String(
                                                                                        fieldDetail.languageCode,
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        fieldDetail.languageCode
                                                                                    }
                                                                                </Tabs.Tab>
                                                                            </Box>
                                                                        );
                                                                    },
                                                                )}
                                                            </Tabs.List>
                                                            {field.quantityDetails.map(
                                                                (
                                                                    fieldDetail,
                                                                    indexFieldDetail,
                                                                ) => {
                                                                    const uniqueKey = `${field.id}-${fieldDetail.languageCode}-123123`;
                                                                    return (
                                                                        <Tabs.Panel
                                                                            className="flex flex-col gap-6 mt-4"
                                                                            key={
                                                                                uniqueKey
                                                                            }
                                                                            value={
                                                                                fieldDetail.languageCode
                                                                            }
                                                                        >
                                                                            <CommonBox title="Thông tin">
                                                                                <Box className="flex flex-col gap-4 mt-4">
                                                                                    <TextInput
                                                                                        className="w-full"
                                                                                        label="Tên tiêu đề"
                                                                                        placeholder="Tên tiêu đề"
                                                                                        required
                                                                                        {...register(
                                                                                            `generalQuantities.${index}.quantityDetails.${indexFieldDetail}.title`,
                                                                                            {
                                                                                                required:
                                                                                                    'Không được để trống !!!',
                                                                                            },
                                                                                        )}
                                                                                        error={
                                                                                            errors
                                                                                                ?.generalQuantities?.[
                                                                                                index
                                                                                            ]
                                                                                                ?.quantityDetails?.[
                                                                                                indexFieldDetail
                                                                                            ]
                                                                                                ?.title
                                                                                                ?.message as string
                                                                                        }
                                                                                        styles={{
                                                                                            input: {
                                                                                                borderColor:
                                                                                                    errors
                                                                                                        ?.generalQuantities?.[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.quantityDetails?.[
                                                                                                        indexFieldDetail
                                                                                                    ]
                                                                                                        ?.title
                                                                                                        ? 'red'
                                                                                                        : '#e9ecee',
                                                                                            },
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            </CommonBox>
                                                                        </Tabs.Panel>
                                                                    );
                                                                },
                                                            )}
                                                        </Tabs>
                                                    )}
                                                </Box>
                                            </CommonBox>
                                        );
                                    })}
                                </Box>
                                <Box
                                    className="w-10 h-10 mt-4 cursor-pointer flex items-center justify-center bg-success-opcity text-success rounded-lg"
                                    onClick={handleAppendQuantities}
                                >
                                    <AddIcon size={16} />
                                </Box>
                            </CommonBox> */}
                                </Box>
                            </Box>
                            <Box className="flex flex-col col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-7 ">
                                {languages && (
                                    <Tabs
                                        defaultValue={String(
                                            languages[0].languageCode,
                                        )}
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
                                                    <CommonBox title="Thông tin chung">
                                                        <Box className="flex flex-col gap-4 mt-4">
                                                            <TextInput
                                                                className="w-full"
                                                                label="Tên công ty"
                                                                placeholder="Tên công ty"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.name`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]?.name
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.name
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />

                                                            <TextInput
                                                                className="w-full"
                                                                label="Địa chỉ"
                                                                placeholder="Địa chỉ"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.address`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]?.address
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.address
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />

                                                            <TextInput
                                                                className="w-full"
                                                                label="Tiêu đề"
                                                                placeholder="Tiêu đề"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.title`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]?.title
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.title
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />

                                                            <TextInput
                                                                className="w-full"
                                                                label="Mô tả ngắn"
                                                                placeholder="Mô tả ngắn"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.subDescription`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.subDescription
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.subDescription
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
                                                                    `generalDetailList.${index}.description`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.description
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.description
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </CommonBox>

                                                    <CommonBox title="Về chúng tôi">
                                                        <Box className="flex flex-col gap-4 mt-4">
                                                            <TextInput
                                                                className="w-full"
                                                                label="Tiêu đề"
                                                                placeholder="Tiêu đề"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.aboutTitle`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.aboutTitle
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.aboutTitle
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
                                                                    `generalDetailList.${index}.aboutDescription`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.aboutDescription
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.aboutDescription
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </CommonBox>
                                                    <CommonBox title="Dịch vụ">
                                                        <Box className="flex flex-col gap-4 mt-4">
                                                            <TextInput
                                                                className="w-full"
                                                                label="Tiêu đề"
                                                                placeholder="Tiêu đề"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.serviceTitle`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.serviceTitle
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.serviceTitle
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
                                                                    `generalDetailList.${index}.serviceDescription`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.serviceDescription
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.serviceDescription
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </CommonBox>
                                                    <CommonBox title="Khách hàng">
                                                        <Box className="flex flex-col gap-4 mt-4">
                                                            <TextInput
                                                                className="w-full"
                                                                label="Tiêu đề"
                                                                placeholder="Tiêu đề"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.partnerTitle`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.partnerTitle
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.partnerTitle
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
                                                                    `generalDetailList.${index}.partnerDescription`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.partnerDescription
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.partnerDescription
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </CommonBox>

                                                    <CommonBox title="Công cụ tìm kiếm tối ưu">
                                                        <Box className="flex flex-col gap-4 mt-4">
                                                            <TextInput
                                                                className="w-full"
                                                                label="Meta title"
                                                                placeholder="Meta title"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.metaTitle`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]?.metaTitle
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.metaTitle
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />

                                                            <TextInput
                                                                className="w-full"
                                                                label="Meta slug"
                                                                placeholder="Meta slug"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.metaSlug`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]?.metaSlug
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.metaSlug
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />

                                                            <TextInput
                                                                className="w-full"
                                                                label="Meta keyword"
                                                                placeholder="Meta keyword"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.metaKeyword`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.metaKeyword
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.metaKeyword
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />

                                                            <Textarea
                                                                autosize
                                                                className="w-full"
                                                                label="Meta description"
                                                                minRows={3}
                                                                placeholder="Meta description"
                                                                required
                                                                {...register(
                                                                    `generalDetailList.${index}.metaDescription`,
                                                                    {
                                                                        required:
                                                                            'Không được để trống !!!',
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.generalDetailList?.[
                                                                        index
                                                                    ]
                                                                        ?.metaDescription
                                                                        ?.message as string
                                                                }
                                                                styles={{
                                                                    input: {
                                                                        borderColor:
                                                                            errors
                                                                                ?.generalDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.metaDescription
                                                                                ? 'red'
                                                                                : '#e9ecee',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </CommonBox>
                                                </Tabs.Panel>
                                            );
                                        })}
                                    </Tabs>
                                )}
                            </Box>

                            <Box className="col-span-12">
                                <WrapperBox title="Ảnh">
                                    <Box className="flex flex-row flex-wrap gap-4 pb-6">
                                        <Box className="w-[120px] h-[auto] my-4">
                                            <Box className="text-sm font-semibold mb-3">
                                                Logo
                                            </Box>
                                            <Box className="w-full h-full overflow-hidden">
                                                <UploadImage
                                                    className="w-80 h-40 object-contain"
                                                    getDataFn={getLogo}
                                                    setData={dataGeneral.logo}
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="w-[120px] h-[auto] my-4">
                                            <Box className="text-sm font-semibold mb-3">
                                                Logo Footer
                                            </Box>
                                            <Box className="w-full h-full overflow-hidden">
                                                <UploadImage
                                                    className="w-80 h-40 object-contain"
                                                    getDataFn={getLogoFooter}
                                                    setData={
                                                        dataGeneral.logoFooter
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="w-20 h-20 my-4">
                                            <Box className="text-sm font-semibold mb-3">
                                                Favicon
                                            </Box>
                                            <Box className="w-full h-full overflow-hidden">
                                                <UploadImage
                                                    className="w-full h-full object-contain"
                                                    getDataFn={getFavicon}
                                                    setData={
                                                        dataGeneral.favicon
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="w-[120px] h-[auto] my-4">
                                            <Box className="text-sm font-semibold mb-3">
                                                Dịch vụ
                                            </Box>
                                            <Box className="w-full h-full overflow-hidden">
                                                <UploadImage
                                                    className="w-80 h-40 object-contain"
                                                    getDataFn={getAboutBanner}
                                                    setData={
                                                        dataGeneral.aboutBanner
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="w-[120px] h-[auto] my-4">
                                            <Box className="text-sm font-semibold mb-3">
                                                Khác hàng
                                            </Box>
                                            <Box className="w-full h-full overflow-hidden">
                                                <UploadImage
                                                    className="w-80 h-40 object-contain"
                                                    getDataFn={getPartnerBanner}
                                                    setData={
                                                        dataGeneral.partnerBanner
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="w-[120px] h-[auto] my-4">
                                            <Box className="text-sm font-semibold mb-3">
                                                Về chúng tôi
                                            </Box>
                                            <Box className="w-full h-full overflow-hidden">
                                                <UploadImage
                                                    className="w-80 h-40 object-contain"
                                                    getDataFn={getServiceBanner}
                                                    setData={
                                                        dataGeneral.serviceBanner
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="w-[120px] h-[auto] my-4">
                                            <Box className="text-sm font-semibold mb-3">
                                                Liên hệ
                                            </Box>
                                            <Box className="w-full h-full overflow-hidden">
                                                <UploadImage
                                                    className="w-80 h-40 object-contain"
                                                    getDataFn={getContactBanner}
                                                    setData={
                                                        dataGeneral.contactBanner
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </WrapperBox>
                            </Box>
                        </Box>
                    )}

                    <Box className="flex justify-center my-6">
                        <Button
                            className="h-[48px] max-h-full text-sm font-normal bg-edit-opcity text-edit"
                            leftSection={<SaveIcon size={18} strokeWidth={2} />}
                            type="submit"
                        >
                            Lưu
                        </Button>
                    </Box>
                </form>
                <WrapperBox title="Danh sách lĩnh vực phát triển">
                    {dataGeneral && (
                        <FiledTable generalId={Number(dataGeneral.id)} />
                    )}
                </WrapperBox>
                <WrapperBox title="Danh sách số lượng">
                    {dataGeneral && (
                        <QuantityTable generalId={Number(dataGeneral.id)} />
                    )}
                </WrapperBox>
            </Box>
        )
    );
};

export default General;
