import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Customer = dynamic(() => import('@src/components/Customer'), {
    ssr: false,
});

const CustomerListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách khách hàng'}
                metaDescription={'CMS AHome'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Customer />
        </>
    );
};

export default CustomerListPage;
