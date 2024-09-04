export type language = {
    id: number;
    description: string;
    languageCode: string;
};

export type SocialMedia = {
    id: string | number,
    icon: string,
    name: string,
    link: string,
}

export type GeneralField = {
    position: number,
    linkMedia: string,
    slug: string,
    generalId: string | number,
    icon: string,
    banner: string,
    generalFieldDetailList: GeneralFieldDetail[]
}
export type GeneralFieldDetail = {
    id: string | number,
    title: string,
    description: string,
    languageId: number,
    languageCode: string,
}

export type GeneralDetail = {
    id: string | number,
    name: string,
    address: string,
    title: string,
    subDescription: string,
    description: string
    aboutTitle: string,
    aboutDescription: string,
    partnerTitle: string,
    partnerDescription: string,
    serviceTitle: string,
    serviceDescription: string,
    contactTitle: string,
    contactDescription: string,
    metaTitle: string,
    metaDescription: string,
    metaKeyword: string,
    metaSlug: string,
    languageId: number,
    languageCode: string,
}


export type General = {
    id: string | number,
    email: string,
    phone: string,
    map: string,
    bodyHtml: string,
    scriptHtml: string,
    telegramGroupChatId: string,
    telegramToken: string,
    logo: string,
    logoFooter: string,
    favicon: string,
    aboutBanner: string,
    partnerBanner: string,
    serviceBanner: string,
    contactBanner: string,
    socialMediaList: SocialMedia[],
    generalDetailList: GeneralDetail[]
}

export type GeneralQuantities = {
    quantity: number,
    icon: string,
    position: number,
    generalId: string | number,
    quantityDetailsList: GeneralQuantityDetails[]
}
export type GeneralQuantityDetails = {
    id: string | number,
    title: string,
    languageId: number,
    languageCode: string,
}

export type TGeneralField = {
    title: string;
    id: number,
    position: number,
    linkMedia: string,
    slug: string,
    description: string,
    icon: string,
}

export type TQuantityField = {
    title: string;
    id: number,
    position: number,
    quantity: number,
    icon: string,
}

export type QueryParamsField = {
    page: number,
    pageSize: number,
}

export type QueryParamsQuantity = {
    page: number,
    pageSize: number,
}

