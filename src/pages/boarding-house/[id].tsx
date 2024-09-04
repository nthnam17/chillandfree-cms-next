import React from 'react';
import dynamic from 'next/dynamic';
import Metatags from '@src/components/common/Metatags';
import { useRouter } from 'next/router';
import logo from '@public/logo.png';
const Boardings = dynamic(() => import('@src/components/Boardings'), {
    ssr: false,
});

const BoardingListPage = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            <Metatags
                metaTitle={'Danh sách tòa nhà'}
                metaDescription={'CMS AHOME'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Boardings idBuilding={id} />
        </>
    );
};

export default BoardingListPage;
