import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const NewsGroup = dynamic(() => import('@src/components/NewsGroup'), {
    ssr: false,
});

const NewsTypePage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách nhóm tin đăng'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <NewsGroup />
        </>
    );
};

export default NewsTypePage;
