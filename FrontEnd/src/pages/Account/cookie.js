import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = name => cookies.get(name);

export const removeCookie = name => cookies.remove(name);
