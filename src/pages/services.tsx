import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Services = dynamic(() => import('@src/components/Services'), {
    ssr: false,
});

const ServicesListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Dịch vụ'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Services />;
        </>
    );
};

export default ServicesListPage;
