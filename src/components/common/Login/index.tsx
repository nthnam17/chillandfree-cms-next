import {
    Box,
    Button,
    Flex,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import React from 'react';
import CustomImage from '../CustomImage';
import Logo from '@public/logo2.png';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { fnLogin } from '@src/store/login';
import Cookies from 'js-cookie';

const Login = () => {
    const {
        reset,
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<any>({
        mode: 'onTouched',
    });
    const router = useRouter();
    const onSubmit = async (data: any) => {
        const res: any = await fnLogin(data);
        console.log(res.statusCode);
        if (res.statusCode === 401) {
            notifications.show({
                color: 'red',
                title: 'Đăng nhập thất bại',
                message: 'Sai tài khoản hoặc mật khẩu',
                bg: '#ffcdd2',
            });
        } else {
            const token = res.data.access_token;
            const role = res.data.role;
            const expirationDate = new Date();
            if (token) {
                Cookies.set('accessToken', token, {
                    expires: expirationDate.getDate() + 7,
                    path: '/',
                });
                Cookies.set('Role', role, {
                    expires: expirationDate.getDate() + 7,
                    path: '/',
                });
                router.push('/');
            }
        }
        return;
    };

    return (
        <Flex className="flex sm:flex-row flex-col w-full h-[100vh] bg-[#fdfdfd]">
            <Box
                className="w-[70%] xl:w-[70%] lg:w-[50%] md:w-[50%] sm:w-[50%] sm:block relative hidden rounded-tr-3xl rounded-br-3xl "
                style={{
                    backgroundImage: 'url("/bg-lg.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Box className="w-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Title
                        className="text-[#ffffff] text-md text-shadow drop-shadow-2xl"
                        order={1}
                    >
                        Chào mừng đến với{' '}
                    </Title>
                    <Title
                        className="text-[#ffffff] text-md drop-shadow-2xl"
                        order={1}
                    >
                        Chill And Free CMS
                    </Title>
                </Box>
            </Box>
            <Box className="w-full xl:w-[30%] lg:w-[50%] md:w-[50%] sm:w-[50%] flex flex-col items-center gap-5 pt-10">
                <Box className="mt-[3rem]">
                    <Link className="" href="/">
                        <CustomImage
                            alt="logo"
                            height={100}
                            src={Logo.src}
                            width={120}
                        />
                    </Link>
                </Box>

                <Box className="w-full h-auto" maw={340} mx="auto">
                    <Title
                        className="text-[#050505] text-md text-center "
                        order={2}
                    >
                        Đăng nhập
                    </Title>
                    <Box className="w-[full] pt-5">
                        <form
                            className="flex flex-col gap-4"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextInput
                                label="Email"
                                placeholder="Nhập email tài khoản của bạn"
                                radius="md"
                                required
                                size="md"
                                {...register('email', {
                                    pattern: {
                                        // eslint-disable-next-line no-useless-escape
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Email không đúng định dạng',
                                    },
                                    validate: (value) => {
                                        return (
                                            !!value.trim() ||
                                            'Vui lòng nhập email để đăng nhập'
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
                            <PasswordInput
                                required
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                radius="md"
                                size="md"
                                {...register('password', {
                                    required: 'Mật khẩu không được để trống',
                                    validate: (value) => {
                                        return (
                                            !!value.trim() ||
                                            'Mật khẩu không được để trống'
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

                            <Button
                                className="bg-primary-btn text-[#ffffff] hover:bg-primary-bg hover:border-primary-btn hover:text-primary-btn "
                                radius="md"
                                size="md"
                                type="submit"
                                w="100%"
                            >
                                Đăng nhập
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

export default Login;
