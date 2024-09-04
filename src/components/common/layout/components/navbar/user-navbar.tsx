/* eslint-disable react/display-name */
import React from 'react';
import { forwardRef } from 'react';
import { Avatar, Box, Group, Menu, UnstyledButton } from '@mantine/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

// import { decodeJwt } from '@src/utils/auth';
interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, ...others }: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            style={{
                padding: 'var(--mantine-spacing-md)',
                color: 'var(--mantine-color-text)',
                borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
        >
            <Group>
                <Avatar variant="filled" radius="xl" src={image} />
            </Group>
        </UnstyledButton>
    ),
);

const UserNavbar = () => {
    // useEffect(() => {
    //     const decoded = decodeJwt();
    //     console.log('Decoded JWT:', decoded);
    //     // Your logic based on the decoded JWT
    // }, []);

    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('accessToken');
        router.push('/login');
    };

    return (
        <Menu
            styles={{
                item: {},
            }}
            transitionProps={{ transition: 'rotate-right', duration: 150 }}
        >
            <Menu.Target>
                <UserButton
                    email="hspoonlicker@outlook.com"
                    image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    name="Harriette Spoonlicker"
                />
            </Menu.Target>
            {/* ... menu items */}
            <Menu.Dropdown
                styles={{
                    dropdown: { width: '10rem' },
                }}
            >
                <Menu.Item className="hover:bg-[rgba(80,80,80,0.05)]">
                    Đổi mật khẩu
                </Menu.Item>
                <Menu.Item className="hover:bg-[rgba(80,80,80,0.05)]">
                    <Box onClick={handleLogout}>Đăng xuất</Box>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default UserNavbar;
