import {
    Box,
    Button,
    Flex,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core';
import React from 'react';
import CustomImage from '../CustomImage';
import Logo from '@public/logo.png';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { LoginType } from './Login.type';
import {
    LoginUserApiResponse,
    useLoginMutation,
} from '@src/redux/endPoint/login';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

const Login = () => {
    const [login] = useLoginMutation();
    const router = useRouter();
    const form = useForm({
        initialValues: {
            usernameOrEmail: '',
            password: '',
        },
        validate: {
            usernameOrEmail: (value) =>
                value.trim() !== '' ? null : 'Nhập tài khoản  ',
            password: (value) => (value.trim() !== '' ? null : 'Nhập mật khẩu'),
        },
    });

    const handleSubmit = async (value: LoginType) => {
        const response: LoginUserApiResponse = await login(value);
        if (response.error) {
            notifications.show({
                color: 'red',
                title: 'Đăng nhập thất bại',
                message: 'Sai tài khoản hoặc mật khẩu',
                bg: '#ffcdd2',
            });
        } else {
            router.reload();
        }
    };

    return (
        <Flex className="flex sm:flex-row flex-col w-full h-[100vh] bg-[#fdfdfd]">
            <Box
                className="w-[70%] xl:w-[70%] lg:w-[50%] md:w-[50%] sm:w-[50%] sm:block relative hidden rounded-tr-3xl rounded-br-3xl "
                style={{
                    backgroundImage: 'url("/background-login.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Box className="w-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Title
                        className="text-[#ffffff] text-md text-shadow"
                        order={1}
                    >
                        Chào mừng đến với{' '}
                    </Title>
                    <Title className="text-[#ffffff] text-md" order={1}>
                        Tektra CMS Admin
                    </Title>
                </Box>
            </Box>
            <Box className="w-full xl:w-[30%] lg:w-[50%] md:w-[50%] sm:w-[50%] flex flex-col items-center gap-5">
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

                <Box className="w-full h-auto pt-20" maw={340} mx="auto">
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
                            onSubmit={form.onSubmit((value) => {
                                handleSubmit(value);
                            })}
                        >
                            <TextInput
                                label="Tài khoản"
                                placeholder="Nhập tài khoản của bạn"
                                radius="md"
                                size="md"
                                withAsterisk
                                {...form.getInputProps('usernameOrEmail')}
                            />
                            <PasswordInput
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                radius="md"
                                size="md"
                                withAsterisk
                                {...form.getInputProps('password')}
                            />

                            <Button
                                className="bg-[#19a9bf] hover:bg-[#f58920] hover:border-[#f58920] text-[#ffffff]"
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
