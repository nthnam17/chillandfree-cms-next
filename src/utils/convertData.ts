// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectToUrlParams = (obj: { [key: string]: any }) => {
    const params = [];

    for (const key in obj) {
        if (
            Object.prototype.hasOwnProperty.call(obj, key) &&
            obj[key] !== null &&
            obj[key] !== undefined &&
            obj[key] !== ''
        ) {
            params.push(
                `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`,
            );
        }
    }

    return params.join('&');
};

// export const convertDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-GB'); // dd/mm/yyyy
// };

export const convertDate = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    const format = (value: number) => (value < 10 ? `0${value}` : `${value}`);
    return `${format(date.getUTCDate())}/${format(date.getUTCMonth() + 1)}/${date.getUTCFullYear()} ${format(date.getUTCHours())}:${format(date.getUTCMinutes())}:${format(date.getUTCSeconds())}`;
}