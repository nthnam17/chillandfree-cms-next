import React from 'react';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
import dynamic from 'next/dynamic';
const General = dynamic(() => import('@src/components/General'), {
    ssr: false,
});

const GeneralsPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Cài đặt chung'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <General />
        </>
    );
};

export default GeneralsPage;
