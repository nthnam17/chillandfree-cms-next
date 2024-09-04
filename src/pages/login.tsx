import Login from '@src/components/common/Login';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';
import React from 'react';

const LoginPage = () => {
    return (
        <>
            <Metatags
                metaTitle={'Đăng nhập'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Login />
        </>
    );
};

export default LoginPage;
