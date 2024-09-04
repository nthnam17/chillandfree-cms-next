import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Investor = dynamic(() => import('@src/components/Investor'), {
    ssr: false,
});

const InvestorListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách chủ đầu tư, chủ trọ'}
                metaDescription={'CMS AHOME'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Investor />
        </>
    );
};

export default InvestorListPage;
