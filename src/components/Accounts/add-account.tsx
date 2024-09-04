import {
    Box,
    Button,
    Flex,
    PasswordInput,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import SaveIcon from '@src/components/common/icon/save-icon';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@src/components/common/icon/close-icon';
// import UploadImage from '@src/components/common/UploadImage';
import { useDisclosure } from '@mantine/hooks';
import { ROLES, STATUS } from '@src/utils/contants';
import { useAddUsersMutation } from '@src/redux/endPoint/accounts';
import { notifications } from '@mantine/notifications';
import { TAccounts } from '@src/types/user';
import UploadImage from '../common/UploadImage';

type Props = {
    onClose: () => void;
};

const AddAccount = ({ onClose }: Props) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        mode: 'onTouched',
    });

    const password = useRef({});
    password.current = watch('password', '');

    const [visible, { toggle }] = useDisclosure(false);

    const [createUser] = useAddUsersMutation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: TAccounts) => {
        try {
            const payload = {
                ...data,
                confirmPassword: undefined,
                roleId: Number(data.roleId),
                status: data.status ? Number(data.status) : 1,
            };

            await createUser(payload).unwrap();
            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Thêm mới tài khoản thành công',
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

    const getAvatar = (avatar: string) => {
        setValue('avatar', avatar);
    };
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box className="w-max h-max col-span-12 mx-auto gap-5">
                <UploadImage
                    className="!w-[120px] !h-[120px] rounded-full"
                    getDataFn={getAvatar}
                />
            </Box>
            <Box className="w-full">
                <Flex className="w-full grid grid-cols-12 gap-6">
                    <Box className="col-span-6">
                        <TextInput
                            className="w-full"
                            label="Họ và tên"
                            mt="md"
                            placeholder="Họ và tên"
                            required
                            {...register('name', {
                                required: 'Không được để trống ',
                                validate: (value) => {
                                    return (
                                        !!value.trim() || 'Không dược để trống'
                                    );
                                },
                            })}
                            error={errors?.name?.message as string}
                            styles={{
                                input: {
                                    borderColor: errors?.name
                                        ? 'red'
                                        : '#e9ecee',
                                },
                            }}
                        />
                        <TextInput
                            className="w-full"
                            label="Email"
                            mt="md"
                            placeholder="Email"
                            required
                            {...register('email', {
                                required: 'Không được để trống ',
                                pattern: {
                                    // eslint-disable-next-line no-useless-escape
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Email không đúng định dạng',
                                },
                                validate: (value) => {
                                    return (
                                        !!value.trim() || 'Không dược để trống'
                                    );
                                },
                            })}
                            error={errors?.email?.message as string}
                            styles={{
                                input: {
                                    borderColor: errors?.email
                                        ? 'red'
                                        : '#e9ecee',
                                },
                            }}
                        />
                        <TextInput
                            className="w-full"
                            label="Số điện thoại"
                            mt="md"
                            placeholder="Số điện thoại"
                            required
                            {...register('phone', {
                                required: 'Không được để trống ',
                                pattern: {
                                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g,
                                    message:
                                        'Số điện thoại không đúng định dạng',
                                },
                                validate: (value) => {
                                    return (
                                        !!value.trim() || 'Không dược để trống'
                                    );
                                },
                            })}
                            error={errors?.phone?.message as string}
                            styles={{
                                input: {
                                    borderColor: errors?.phone
                                        ? 'red'
                                        : '#e9ecee',
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            name="roleId"
                            render={({ field }) => (
                                <Select
                                    className="col-span-3"
                                    data={ROLES.filter((val) => val.id).map(
                                        (item: {
                                            id: number | string;
                                            name: string;
                                        }) => ({
                                            label: item.name,
                                            value: String(item.id),
                                        }),
                                    )}
                                    error={errors?.roleId?.message as string}
                                    label="Phân quyền"
                                    mt="md"
                                    placeholder="-- Chọn quyền --"
                                    required
                                    styles={{
                                        input: {
                                            borderColor: errors?.roleId
                                                ? 'red'
                                                : '#e9ecee',
                                        },
                                    }}
                                    {...field}
                                />
                            )}
                            rules={{
                                required: 'Không được để trống ',
                            }}
                        />
                    </Box>
                    <Box className="col-span-6">
                        <TextInput
                            className="w-full"
                            label="Tài khoản đăng nhập"
                            mt="md"
                            placeholder="Tài khoản đăng nhập"
                            required
                            {...register('username', {
                                required: 'Không được để trống ',
                                validate: (value) => {
                                    return (
                                        !!value.trim() || 'Không dược để trống'
                                    );
                                },
                            })}
                            error={errors?.username?.message as string}
                            styles={{
                                input: {
                                    borderColor: errors?.username
                                        ? 'red'
                                        : '#e9ecee',
                                },
                            }}
                        />
                        <Stack>
                            <PasswordInput
                                className="w-full"
                                label="Mật khẩu"
                                mt="md"
                                onVisibilityChange={toggle}
                                placeholder="Mật khẩu"
                                required
                                visible={visible}
                                {...register('password', {
                                    required: 'Không được để trống ',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Mật khẩu tối thiểu là 6 ký tự',
                                    },
                                    validate: (value) => {
                                        return (
                                            !!value.trim() ||
                                            'Không dược để trống'
                                        );
                                    },
                                })}
                                error={errors?.password?.message as string}
                                styles={{
                                    input: {
                                        borderColor: errors?.password
                                            ? 'red'
                                            : '#e9ecee',
                                    },
                                }}
                            />
                            <PasswordInput
                                className="w-full"
                                label="Nhập lại mật khẩu"
                                onVisibilityChange={toggle}
                                placeholder="Nhập lại mật khẩu"
                                required
                                visible={visible}
                                {...register('confirmPassword', {
                                    required: 'Không được để trống ',
                                    validate: (value) => {
                                        return (
                                            value === password.current ||
                                            'Mật khẩu không khớp'
                                        );
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Mật khẩu tối thiểu là 6 ký tự',
                                    },
                                })}
                                error={
                                    errors?.confirmPassword?.message as string
                                }
                                styles={{
                                    input: {
                                        borderColor: errors?.confirmPassword
                                            ? 'red'
                                            : '#e9ecee',
                                    },
                                }}
                            />
                        </Stack>

                        <Controller
                            control={control}
                            name="status"
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
                                    defaultValue="1"
                                />
                            )}
                        />
                    </Box>
                </Flex>
            </Box>
            <Flex className="flex justify-end gap-4 mt-6">
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-success-opcity text-success"
                    leftSection={<SaveIcon size={18} strokeWidth={2} />}
                    type="submit"
                >
                    Thêm người dùng
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

export default AddAccount;
