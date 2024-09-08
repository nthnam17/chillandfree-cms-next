import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Category = dynamic(() => import('@src/components/category'), {
    ssr: false,
});

const CategoryListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh mục phim'}
                metaDescription={'Chill And Free Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Category />
        </>
    );
};

export default CategoryListPage;
