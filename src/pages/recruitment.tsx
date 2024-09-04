import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
const Recruitment = dynamic(() => import('@src/components/Recruitment'), {
    ssr: false,
});

const RecruitmentListPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Đơn tuyển dụng'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Recruitment />
        </>
    );
};

export default RecruitmentListPage;
