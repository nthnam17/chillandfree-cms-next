import { RootState } from '@src/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { IMenuSidebar } from './sidebar.type';

const MenuSidebar = ({ label, children, hover }: IMenuSidebar) => {
    const { isShow } = useSelector((state: RootState) => state.actionShow);

    return (
        <div
            className={`${
                isShow || (hover && !isShow) ? '' : 'flex flex-col items-center'
            } ease-in-out duration-200`}
        >
            <span
                className={`text-md font-normal ${
                    isShow || (hover && !isShow) ? 'block ' : 'hidden'
                } ease-in-out duration-200 text-xs text-[#919eab] font-normal pt-4 pl-3 pb-2 pr-2`}
            >
                {label}
            </span>
            {children}
        </div>
    );
};

export default MenuSidebar;
