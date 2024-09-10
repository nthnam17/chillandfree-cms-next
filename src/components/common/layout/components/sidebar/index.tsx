/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MenuCollapse from './menu-collapse';
import MenuSidebar from './menu-sidebar';

import { Box, Image } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { useHover } from '@mantine/hooks';
import { MenuSetting } from './sidebar.type';
import Logo from '@public/logo.png';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { setIsShow } from '@src/redux/slices/sideBarSlice';

import { dataMenu } from './dataMenu';

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
    const menuSetting: MenuSetting = dataMenu;

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
            className={`ease duration-500 bg-[#ffffff] h-[100vh] overflow-y-auto overflow-x-hidden ${
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
                            item.children.map((children, i) => (
                                <MenuCollapse
                                    hover={hovered}
                                    href={children.href}
                                    icon={children.icon}
                                    id={children.id}
                                    idActive={activeMenuItemId}
                                    items={children.children}
                                    key={`children-${i}`}
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
