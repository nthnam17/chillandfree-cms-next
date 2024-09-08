import { fetchData } from '@src/utils/fetchData';

export const fnLogin = async (payload: any) => {
    const response = await fetchData('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    return response;
};
