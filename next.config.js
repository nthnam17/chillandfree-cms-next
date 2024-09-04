/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['cms.tektra.vn']
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        PUBLIC_IMAGE_API_BASE_URL: process.env.PUBLIC_IMAGE_API_BASE_URL,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        NEXT_TEKTRA_API_BASE_URL: process.env.NEXT_TEKTRA_API_BASE_URL
    },
};

module.exports = nextConfig;
