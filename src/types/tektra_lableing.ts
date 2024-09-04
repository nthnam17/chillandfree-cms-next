export type TektraLabelingDetail = {
    id: string | number;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
    metaSlug: string;
    languageId: number;
    languageCode: string;
};

export type TektraLabeling = {
    id: string | number;
    favicon: string;
    banner: string;
    manageLabelDetailList: TektraLabelingDetail[];
};

export type ProcedureDetail = {
    id: string | number;
    // procedureId: string | number,
    title: string;
    description: string;
    languageId: number;
    languageCode: string;
};

export type Procedure = {
    id: string | number;
    title: string;
    description: string;
    slug: string;
    manageLabelId: string | number;
    position: number;
    image: string;
    procedureDetailList: ProcedureDetail[];
};

export type QueryParamsProcedure = {
    pageIndex?: number;
    pageSize?: number;
};

export type QueryParamsSlide = {
    pageIndex?: number;
    pageSize?: number;
};

export type Slide = {
    procedureId: string | number;
    position: number;
    slug: string;
    image: string;
    slideDetailList: ProcedureDetail[];
};
