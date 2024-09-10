export type IMenuSidebar = {
    label?: string | React.ReactNode;
    children: React.ReactNode;
    hover: boolean;
};

export type IMenuCollapse = {
    id: number;
    label: string;
    icon?: React.ReactNode;
    // eslint-disable-next-line
    items: any[] | undefined;
    hover: boolean;
    href: string | undefined;
    onClick?: () => void;
    idActive: number;
};

type Menu = {
    id: number;
    label: string;
    icon?: React.ReactNode;
    children?: Menu[];
    href?: string;
};

export type MenuSetting = Menu[];
