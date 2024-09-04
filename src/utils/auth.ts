import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


export const decodeJwt = () => {
    const token = Cookies.get('accessToken');
    if (token) {
        const decoded = jwtDecode(token)
        return decoded;
    }
    return null;
};