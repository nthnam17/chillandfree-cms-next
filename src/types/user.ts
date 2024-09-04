export type TAccounts = {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    avatar?: string | null;
    status?: number;
    rememberToken?: string | null;
    role?: string | number;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string | null;
    updatedBy?: string | null;
    roles?: {
        id?: number;
        name?: string;
    };
    roleId?: string | number;
};
