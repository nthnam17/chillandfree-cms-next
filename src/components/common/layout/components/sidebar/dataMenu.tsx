import { MenuSetting } from './sidebar.type';
import HomeIcon from '@src/components/common/icon/home-icon';
import SettingsIcon from '@src/components/common/icon/settings-icon';
import BalanceIcon from '@src/components/common/icon/balance-icon';
import FeedbackIcon from '@src/components/common/icon/feedback-icon';
import PartnerIcon from '@src/components/common/icon/partner-icon';
import ServicesIcon from '@src/components/common/icon/services-icon';
import RecruitmentIcon from '@src/components/common/icon/recruitment-icon';
import MapPinIcon from '@src/components/common/icon/map-pin';
import MenuIcon from '@src/components/common/icon/menu-icon';
import GenreIcon from '@src/components/common/icon/genre-icon';
import CountryIcon from '@src/components/common/icon/country-icon';

export const dataMenu: MenuSetting = [
    {
        id: 1,
        label: '',
        icon: <HomeIcon fill={'#637381'} size={22} />,
        children: [
            {
                id: 1,
                label: 'Trang chủ',
                href: '/',
                icon: <HomeIcon fill={'#637381'} size={22} />,
            },
        ],
    },
    {
        id: 5,
        label: 'DỮ LIỆU CHUNG',
        icon: <HomeIcon fill={'#637381'} size={22} />,
        children: [
            {
                id: 1,
                label: 'Quản lý danh mục',
                icon: <MenuIcon fill={'#637381'} size={22} />,
                href: '/category',
            },
            {
                id: 2,
                label: 'Quản lý thể loại',
                icon: <GenreIcon fill={'#637381'} size={22} />,
                href: '/genre',
            },
            {
                id: 3,
                label: 'Quản lý quốc gia',
                icon: <CountryIcon fill={'#637381'} size={22} />,
                href: '/country',
            },
        ],
    },
    {
        id: 2,
        label: 'DỮ LIỆU PHIM',
        icon: <HomeIcon fill={'#637381'} size={22} />,
        children: [
            {
                id: 1,
                label: 'Quản lý phim',
                icon: <BalanceIcon fill={'#637381'} size={22} />,
                href: '/movie',
            },
            {
                id: 2,
                label: 'Quản lý tập phim',
                icon: <BalanceIcon fill={'#637381'} size={22} />,
                href: '/episode',
            },
        ],
    },
    {
        id: 4,
        label: 'CRAWLER DATA',
        icon: <HomeIcon fill={'#637381'} size={22} />,
        children: [
            {
                id: 1,
                label: 'Quản lý crawl dữ liệu',
                icon: <BalanceIcon fill={'#637381'} size={22} />,
                href: '/crawl',
            },
        ],
    },
    {
        id: 37567,
        label: 'HỆ THỐNG',
        icon: <HomeIcon fill={'#637381'} size={22} />,
        children: [
            {
                id: 1,
                label: 'Cài Đặt',
                icon: <SettingsIcon fill={'#637381'} size={22} />,
                children: [
                    {
                        id: 1785,
                        label: 'Người dùng',
                        href: '/general/accounts',
                    },
                    {
                        id: 1786,
                        label: 'Cấu hình website',
                        href: '/general/general',
                    },
                    {
                        id: 1787,
                        label: 'Nhóm người dùng',
                        href: '/general/roles',
                    },
                ],
            },
        ],
    },
];
