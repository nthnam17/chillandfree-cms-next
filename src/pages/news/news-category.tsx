import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const NewsCategory = dynamic(() => import('@src/components/CategoryNews'), {
    ssr: false,
});

const NewsCategoryPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách danh mục tin đăng'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <NewsCategory />
        </>
    );
};

export default NewsCategoryPage;
