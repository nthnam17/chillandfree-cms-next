import Cookies from 'js-cookie';

export async function fetchData<T>(
    url: string,
    options: RequestInit = {},
): Promise<T> {
    try {
        const userToken = Cookies.get('accessToken') || '';

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        // Nếu có token và url không phải là 'refresh', thêm Authorization header
        if (userToken && url !== 'refresh') {
            headers['Authorization'] = `Bearer ${userToken}`;
        }

        // Gọi fetch API với base URL
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
            {
                ...options,
                headers,
            },
        );

        if (!res.ok && res.status !== 401) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: T = await res.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
