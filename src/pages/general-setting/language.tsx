import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Language = dynamic(() => import('@src/components/Language'), {
    ssr: false,
});

const LanguagesListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Cài đặt ngôn ngữ'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Language />
        </>
    );
};

export default LanguagesListPage;
