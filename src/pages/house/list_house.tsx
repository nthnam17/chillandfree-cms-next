import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const House = dynamic(() => import('@src/components/House'), {
    ssr: false,
});

const HouseListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách nhà'}
                metaDescription={'CMS AHome'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <House />
        </>
    );
};

export default HouseListPage;
