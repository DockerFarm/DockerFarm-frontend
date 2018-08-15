import http from 'lib/httpClient';

export const getNetworkList = _ => http.get('/admin/network');
export const getNetworkInfo = id => http.get(`/admin/network/${id}`);