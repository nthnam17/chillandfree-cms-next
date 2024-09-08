export type TGroup = {
    createBy: number;
    createTime: string;
    description: string;
    groupName: string;
    id: number;
    status: number;
    updateBy: number;
    updateTime: string;
};

export type TPage = {
    id: number;
    isOpen: number;
    level: number;
    menuIndex: number;
    pageIcon: string;
    pageName: string;
    pageUrl: string;
    parentId: number;
    checked: boolean;
};

export type TRole = {
    id: number;
    pageId: number;
    roleName: string;
    checked: boolean;
};
