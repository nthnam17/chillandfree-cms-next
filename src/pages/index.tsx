import { Box } from '@mantine/core';
import Metatags from '@src/components/common/Metatags';
import logo from '@public/logo.png';

export default function Home() {
    return (
        <>
            <Metatags
                metaTitle={'Ahome Admin'}
                metaDescription={'Ahome Admin'}
                logo={logo.src}
                thumbnail={logo.src}
            />
            <Box className="mx-10 text-base rounded-md from-delete px-4 bg-primary-bg text-primary-yellow py-3">
                Chill And Free Xin chào !
            </Box>
        </>
    );
}
