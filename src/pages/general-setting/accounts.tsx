import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Accounts = dynamic(() => import('@src/components/Accounts'), {
    ssr: false,
});

const AccountsListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Người dùng'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Accounts />
        </>
    );
};

export default AccountsListPage;
