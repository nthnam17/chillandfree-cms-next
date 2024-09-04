import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Buildings = dynamic(() => import('@src/components/Buildings'), {
    ssr: false,
});

const BuildingsListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách tòa nhà'}
                metaDescription={'CMS AHOME'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Buildings />
        </>
    );
};

export default BuildingsListPage;
