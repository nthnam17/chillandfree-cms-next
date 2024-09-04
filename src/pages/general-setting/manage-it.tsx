// import TektraIT from '@src/components/TektraIT';
import dynamic from 'next/dynamic';
import React from 'react';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const TektraIT = dynamic(() => import('@src/components/TektraIT'), {
    ssr: false,
});
const TektraItPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Tektra IT'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <TektraIT />
        </>
    );
};

export default TektraItPage;
