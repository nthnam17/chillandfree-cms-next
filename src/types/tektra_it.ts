
export type ManagerIT = {
    id: string | number,
    banner: string,
    favicon: string,
    manageItDetailList: ManagerITDetail[]
}

export type ManagerITDetail = {
    id: string | number,
    title: string,
    description: string,
    metaTitle: string,
    metaDescription: string,
    metaKeyword: string,
    metaSlug: string,
    languageId: number,
    languageCode: string,
}
export type TProductIt = {
    id: string | number,
    position: number,
    banner: string,
    image: string,
    title: string,
    description: string,
    technology: string,
}
export type ProductIt = {
    id: string | number,
    position: number,
    banner: string,
    slug: string,
    image: string,
    manageItId: string | number,
    productDetailList: ProductItDetail[]
}

export type ProductItDetail = {
    id: string | number,
    title: string,
    description: string,
    technology: string,
    languageId: number,
    languageCode: string,
}

export type TDevelopment = {
    id: string | number,
    position: number,
    image: string,
    title: string,
    description: string,
}

export type Development = {
    productId: string | number,
    position: number,
    slug: string,
    image: string,
    developDetailList: DevelopmentDetail[]
}

export type DevelopmentDetail = {
    title: string,
    description: string,
    developmentId: string | number,
    languageId: number,
    languageCode: string,
}


export type QueryParamsProductIt = {
    pageIndex?: number;
    pageSize?: number;
};
export type QueryParamsDevelopment = {
    productId: number;
    pageIndex?: number;
    pageSize?: number;
};