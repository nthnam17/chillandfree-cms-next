import { fetchData } from '@src/utils/fetchData';

export const fnGetLstCategory = async (params: Record<string, string>) => {
    const queryString = new URLSearchParams(params).toString();
    return await fetchData(`/category?${queryString}`);
};

export const fnAddCategory = async (payload: any) => {
    const response = await fetchData('/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    return response;
};

export const fnGetCategoryDetail = async (id: number) => {
    return await fetchData(`/category/${id}`);
};

// export const fnGetPageRole = async () => {
//     return await fetchData(`/auth/page`);
// };

export const fnDeleteCategory = async (id: number) => {
    return await fetchData(`/category/${id}`, {
        method: 'DELETE',
    });
};

export const fnUpdateCategory = async (id: number, payload: any) => {
    return await fetchData(`/auth/group/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
};
