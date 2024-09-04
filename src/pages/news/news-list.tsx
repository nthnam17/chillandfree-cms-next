import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const News = dynamic(() => import('@src/components/News'), { ssr: false });

const NewsListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách tin đăng'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <News />
        </>
    );
};

export default NewsListPage;
