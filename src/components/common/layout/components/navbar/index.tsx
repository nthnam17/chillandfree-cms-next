import { Box, Button, Center } from '@mantine/core';
import MenuIcon from '@src/components/common/icon/menu-icon';
import { setIsShow } from '@src/redux/slices/sideBarSlice';
import { RootState } from '@src/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserNavbar from './user-navbar';

interface Props {
    children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
    const dispatch = useDispatch();
    const { isShow } = useSelector((state: RootState) => state.actionShow);

    const handleShowSidebar = () => {
        dispatch(setIsShow(!isShow));
    };
    return (
        <div className="flex-1 bg-white relative ">
            <Box className="px-10 bg-[#ffffff] flex items-center justify-between sticky top-0 h-[80px] max-h-full border-b border-[#919eab33] border-dashed">
                <Button
                    className="p-0 w-9 h-9  border-none rounded-full bg-[#fcfcfc] hover:bg-[#f5f5f5] shadow-md"
                    onClick={handleShowSidebar}
                    styles={{
                        root: {
                            borderRadius: '100%',
                        },
                    }}
                >
                    <MenuIcon fill="#f78a1c" size={24} />
                </Button>
                <Box>
                    <UserNavbar />
                </Box>
            </Box>
            <Center className="relative overflow-auto h-[100vh] w-full">
                <Box className="mt-12 w-full absolute top-0 left-0 right-0">
                    {children}
                </Box>
            </Center>
        </div>
    );
};

export default Navbar;
