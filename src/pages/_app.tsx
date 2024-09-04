import '@mantine/core/styles.css';
import '@src/styles/globals.css';
import '@mantine/notifications/styles.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@src/redux/store';
import { MantineProvider } from '@mantine/core';
import { theme } from '../styles/theme';
import Layout from '@src/components/common/layout';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CircularProgress from '@src/components/common/CircularProgress';
import { Notifications } from '@mantine/notifications';
import '@fontsource-variable/public-sans';

function Loading() {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', () => setLoading(true));
        Router.events.on('routeChangeComplete', () => setLoading(false));
        Router.events.on('routeChangeError', () => setLoading(false));

        return () => {
            Router.events.off('routeChangeStart', () => setLoading(true));
            Router.events.off('routeChangeComplete', () => setLoading(false));
            Router.events.off('routeChangeError', () => setLoading(false));
        };
    }, [Router.events]);
    return loading ? <CircularProgress /> : <></>;
}
export default function App({ Component, pageProps }: AppProps) {
    const { asPath, pathname } = useRouter();
    const isLoginPage =
        asPath?.split('/').includes('login') || pathname?.includes('404');

    return (
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <Notifications
                    autoClose={4000}
                    maw="22rem"
                    position="top-right"
                />
                <Loading />

                {isLoginPage ? (
                    <Component {...pageProps} />
                ) : (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                )}
            </MantineProvider>
        </Provider>
    );
}
