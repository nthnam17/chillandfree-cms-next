/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MenuCollapse from './menu-collapse';
import MenuSidebar from './menu-sidebar';
import HomeIcon from '@src/components/common/icon/home-icon';
import SettingsIcon from '@src/components/common/icon/settings-icon';
import { Box, Image } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { useHover } from '@mantine/hooks';
import { MenuSetting } from './sidebar.type';
import Logo from '@public/logo.png';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { setIsShow } from '@src/redux/slices/sideBarSlice';
import BalanceIcon from '@src/components/common/icon/balance-icon';
import FeedbackIcon from '@src/components/common/icon/feedback-icon';
import PartnerIcon from '@src/components/common/icon/partner-icon';
import ServicesIcon from '@src/components/common/icon/services-icon';
import RecruitmentIcon from '@src/components/common/icon/recruitment-icon';
import MapPinIcon from '@src/components/common/icon/map-pin';

const Sidebar = () => {
    const dispatch = useDispatch();

    const { hovered, ref } = useHover();
    const [activeMenuItemId, setActiveMenuItemId] = useState<number>(-1);
    const matches = useMediaQuery('(max-width: 74em)');
    useEffect(() => {
        if (matches) {
            dispatch(setIsShow(false));
        }
    }, [matches]);
    const menuSetting: MenuSetting = [
        {
            id: 1,
            label: '',
            icon: <HomeIcon fill={'#637381'} size={22} />,
            children: [
                {
                    id: 1,
                    label: 'Trang chủ',
                    href: '/',
                    icon: <HomeIcon fill={'#637381'} size={22} />,
                },
            ],
        },
        {
            id: 2,
            label: 'QUẢN LÝ ĐỐI TÁC',
            icon: <HomeIcon fill={'#637381'} size={22} />,
            children: [
                {
                    id: 1,
                    label: 'Quản lý chủ đầu tư',
                    icon: <BalanceIcon fill={'#637381'} size={22} />,
                    children: [
                        {
                            id: 1,
                            label: 'Danh sách chủ đầu tư',
                            href: '/partners/Investor_list',
                            icon: <BalanceIcon fill={'#637381'} size={22} />,
                        },
                    ],
                },
                {
                    id: 2,
                    label: 'Quản lý khách hàng',
                    icon: <PartnerIcon fill={'#637381'} size={22} />,
                    children: [
                        {
                            id: 1,
                            label: 'Danh sách khách hàng',
                            href: '/partners/customer_list',
                            icon: <BalanceIcon fill={'#637381'} size={22} />,
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            label: 'QUẢN LÝ NHÀ',
            icon: <HomeIcon fill={'#637381'} size={22} />,
            children: [
                {
                    id: 1,
                    label: 'Quản lý nhà',
                    icon: <BalanceIcon fill={'#637381'} size={22} />,
                    children: [
                        {
                            id: 1,
                            label: 'Danh sách nhà',
                            href: '/house/list_house',
                            icon: <BalanceIcon fill={'#637381'} size={22} />,
                        },
                    ],
                },
                {
                    id: 2,
                    label: 'Quản lý phòng trọ',
                    icon: <PartnerIcon fill={'#637381'} size={22} />,
                    children: [
                        {
                            id: 1,
                            label: 'Danh sách phòng trọ',
                            href: '/house/boarding_house',
                            icon: <BalanceIcon fill={'#637381'} size={22} />,
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            label: 'QUẢN LÝ HOMEPAGE',
            icon: <HomeIcon fill={'#637381'} size={22} />,
            children: [
                {
                    id: 1,
                    label: 'Tin đăng',
                    icon: <BalanceIcon fill={'#637381'} size={22} />,
                    children: [
                        {
                            id: 1,
                            label: 'Danh sách',
                            href: '/news/news-list',
                            icon: <BalanceIcon fill={'#637381'} size={22} />,
                        },
                        {
                            id: 2,
                            label: 'Danh mục',
                            href: '/news/news-category',
                            icon: <BalanceIcon fill={'#637381'} size={22} />,
                        },
                        {
                            id: 3,
                            label: 'Thể loại',
                            href: '/news/news-group',
                            icon: <BalanceIcon fill={'#637381'} size={22} />,
                        },
                    ],
                },
            ],
        },
        {
            id: 37567,
            label: 'HỆ THỐNG',
            icon: <HomeIcon fill={'#637381'} size={22} />,
            children: [
                {
                    id: 132,
                    label: 'Cài Đặt',
                    icon: <SettingsIcon fill={'#637381'} size={22} />,
                    children: [
                        {
                            id: 1785,
                            label: 'Người dùng',
                            href: '/general-setting/accounts',
                            icon: <SettingsIcon fill={'#637381'} size={22} />,
                        },
                        {
                            id: 27567,
                            label: 'Ngôn ngữ',
                            href: '/general-setting/language',
                            icon: <SettingsIcon fill={'#637381'} size={22} />,
                        },

                        {
                            id: 23567,
                            label: 'Chung',
                            href: '/general-setting/general',
                            icon: <SettingsIcon fill={'#637381'} size={22} />,
                        },
                    ],
                },
            ],
        },
    ];

    const { isShow } = useSelector((state: RootState) => state.actionShow);

    const handleSetActiveId = (id: number) => {
        if (activeMenuItemId === id) {
            setActiveMenuItemId(-1);
        } else {
            setActiveMenuItemId(id);
        }
    };
    return (
        <Box
            className={`ease duration-500 bg-[#ffffff] h-[100vh] overflow-y-auto ${
                isShow || (hovered && !isShow)
                    ? 'w-[260px] max-h-full px-4'
                    : 'w-[90px]'
            }  border-r border-[#919eab33] border-dashed `}
        >
            <Box className="w-full" ref={ref}>
                <Link
                    className="w-full flex justify-center items-center mt-5"
                    href="/"
                >
                    <Image
                        alt="logo"
                        className="w-[160px] h-max object-contain aspect-[16/9]"
                        src={Logo.src}
                    />
                </Link>
                {menuSetting.map((item) => (
                    <MenuSidebar
                        hover={hovered}
                        key={item.id}
                        label={
                            item.label && (
                                <h1 className="font-semibold">{item.label}</h1>
                            )
                        }
                    >
                        {item.children &&
                            item.children.map((children) => (
                                <MenuCollapse
                                    hover={hovered}
                                    href={children.href}
                                    icon={children.icon}
                                    id={children.id}
                                    idActive={activeMenuItemId}
                                    items={children.children}
                                    key={children.id}
                                    label={children.label}
                                    onClick={() =>
                                        handleSetActiveId(children.id)
                                    }
                                ></MenuCollapse>
                            ))}
                    </MenuSidebar>
                ))}
            </Box>
        </Box>
    );
};

export default Sidebar;
