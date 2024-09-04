export type TNewsGenre = {
    id?: number;
    name?: string;
    slug?: string;
    status?: number;
    rememberToken?: string | null;
    metaTitle: string;
    metaKeyword: string;
    metaDescription: string;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string | null;
    updatedBy?: string | null;
};
