import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'primary-edit': '#4B49AC',
                'primary-yellow': '#56721b',
                'primary-green': '#00747a',
                'primary-gray': '#637381',
                'primary-black': '#212b36',
                'primary-border': '#919eab33',
                'primary-bg': '#e5ebd8',
                success: '#06d6a0',
                'success-opcity': '#cdf7ec',
                delete: '#ef476f',
                'delete-opcity': '#fcdae2',
                edit: '#1ea6d3',
                'edit-opcity': '#d2edf6',
                warning: '#f1be46',
                'warning-opcity': '#fcf2da',
            },
        },
    },
    plugins: [],
};
export default config;
