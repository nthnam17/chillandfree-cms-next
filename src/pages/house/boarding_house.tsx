import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
import Boardings from '@src/components/Boardings';
const BoardingsHouse = dynamic(() => import('@src/components/BoardingsHouse'), {
    ssr: false,
});

const BoardingsHouseListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Danh sách nhà'}
                metaDescription={'CMS AHome'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <BoardingsHouse />
        </>
    );
};

export default BoardingsHouseListPage;
