import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Partner = dynamic(() => import('@src/components/Partner'), {
    ssr: false,
});

const PartnerListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Đối tác'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Partner />
        </>
    );
};

export default PartnerListPage;
