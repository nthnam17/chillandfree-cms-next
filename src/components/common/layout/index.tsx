import React from 'react';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

interface Props {
    children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
    return (
        <div className="flex w-full fixed top-0 left-0 right-0">
            <Sidebar />

            <Navbar>{children}</Navbar>
        </div>
    );
};

export default Layout;
