import dynamic from 'next/dynamic';
import React from 'react';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const TektraLabeling = dynamic(() => import('@src/components/TektraLabeling'), {
    ssr: false,
});
const TektraLabelingPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Tektra Labeling'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <TektraLabeling />
        </>
    );
};

export default TektraLabelingPage;
