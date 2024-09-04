/* eslint-disable @typescript-eslint/no-unused-vars */
import { Accordion, Box } from '@mantine/core';
import { RootState } from '@src/redux/store';
import Link from 'next/link';
import React, { useState, cloneElement, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { IMenuCollapse } from './sidebar.type';
import { useRouter } from 'next/router';
interface IconProps {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}
const MenuCollapse = ({
    id,
    icon,
    label,
    items,
    hover,
    href = '/',
    onClick,
    idActive = NaN,
}: IMenuCollapse) => {
    const { isShow } = useSelector((state: RootState) => state.actionShow);

    const { pathname } = useRouter();

    const [value, setValue] = useState<string | null>(null);
    return items ? (
        <Accordion
            chevronSize={isShow || hover ? '15' : '0'}
            className={`border-none ${
                isShow || hover ? 'w-[14rem]' : 'w-full '
            }`}
            // multiple={false}
            // onChange={setValue}
            styles={{
                label: {
                    padding: 0,
                    color: '#4b5761',
                },
                content: {
                    padding: 0,
                },
                control: {
                    borderRadius: '8px',
                },
                chevron: {
                    color: '#4b5761',
                },
            }}
            // value={value}
            variant="contained"
        >
            <Accordion.Item
                className=" border-none bg-transparent rounded-lg min-h-[3rem] w-full p-0"
                value={label}
            >
                <Accordion.Control
                    className={`relative flex flex-col-reverse sm:flex-row-reverse max-w-full rounded-lg pl-3 py-1 pr-2 mb-1 min-h-[44px] translate-x-0 ease-in-out duration-200 ${
                        isShow || (hover && !isShow)
                            ? 'w-[14rem]'
                            : 'w-full justify-center'
                    } `}
                    icon={
                        React.isValidElement(icon) &&
                        cloneElement(icon as ReactElement<IconProps>)
                    }
                    onClick={onClick}
                    styles={
                        isShow || (hover && !isShow)
                            ? {}
                            : {
                                  icon: {
                                      width: '100%',
                                      margin: 'auto',
                                      paddingTop: 12,
                                      paddingBottom: 12,
                                  },
                              }
                    }
                >
                    <span
                        className={`${
                            isShow || (hover && !isShow) ? '' : 'hidden'
                        }  ease-in-out duration-200 text-[10px] sm:text-base font-semibold text-[#4b5761]
                        `}
                    >
                        {label}
                    </span>
                </Accordion.Control>
                <span
                    className={`${
                        isShow || (hover && !isShow)
                            ? 'hidden'
                            : 'w-max block text-[0.7rem] m-auto text-[#637381]'
                    } `}
                >
                    {label}
                </span>
                {isShow || (hover && !isShow) ? (
                    <Accordion.Panel className="bg-transparent p-0" px="0">
                        <div className="flex flex-col gap-[2px]">
                            {items.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        className="w-full ml-2 mb-1 items-center flex flex-row gap-2 rounded-lg pl-3 py-1 pr-2 min-h-[36px] hover:bg-[#919eab14]"
                                        href={item.href}
                                    >
                                        <Box className="w-[6px] h-[6px] rounded-full bg-primary-gray" />
                                        <span
                                            className={`${'w-full flex text-default-500 hover:text-default-900 transition-colors text-[#637381] font-medium text-sm'} ${
                                                pathname == item.href
                                                    ? 'text-primary-yellow'
                                                    : 'text-[#637381]'
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Accordion.Panel>
                ) : (
                    <></>
                )}
            </Accordion.Item>
        </Accordion>
    ) : (
        <>
            <Link
                className={`w-full text-default-900 flex items-center mb-1 active:bg-none rounded-lg pl-3 py-1 pr-2 min-h-[44px] hover:bg-[#919eab14] ${
                    isShow || (hover && !isShow)
                        ? ' w-[14rem]'
                        : 'w-full justify-center'
                } ${
                    (pathname == href && isShow) ||
                    (pathname == href && hover && !isShow)
                        ? 'bg-primary-yellow bg-opacity-[0.08]'
                        : 'text-[#637381]'
                }`}
                href={href}
            >
                <div
                    className={`${
                        isShow || (hover && !isShow ? 'flex-row' : 'flex-col')
                    } flex gap-3 max-w-full max-h-[44px] items-center rounded-xl cursor-pointer transition-all duration-150`}
                >
                    {React.isValidElement(icon) &&
                        cloneElement(icon as ReactElement<IconProps>, {
                            fill: pathname === href ? '#f78a1c' : '#637381',
                            size: 22,
                        })}
                    <span
                        className={`${
                            isShow ||
                            (hover && !isShow ? '' : 'transition-all hidden')
                        } ease-in-out duration-200 text-base  ${
                            pathname == href
                                ? 'text-primary-yellow'
                                : 'text-[#4b5761]'
                        }`}
                    >
                        {label}
                    </span>
                </div>
            </Link>

            <span
                className={`${
                    isShow || (hover && !isShow)
                        ? 'hidden'
                        : 'w-max block text-[0.7rem] m-auto text-[#637381]'
                } ${
                    pathname == href ? 'text-primary-yellow' : 'text-[#637381]'
                }`}
            >
                {label}
            </span>
        </>
    );
};

export default MenuCollapse;
