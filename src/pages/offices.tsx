import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Offices = dynamic(() => import('@src/components/Offices'), {
    ssr: false,
});

const OfficesPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Trụ Sở'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Offices />
        </>
    );
};

export default OfficesPage;
