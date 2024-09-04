import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Feedback = dynamic(() => import('@src/components/Feedback'), {
    ssr: false,
});

const FeedbackListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Feedback'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Feedback />
        </>
    );
};

export default FeedbackListPage;
