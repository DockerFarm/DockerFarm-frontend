import http from 'lib/httpClient';

export const getNetworkList = _ => http.get('/admin/network');
export const getNetworkInfo = id => http.get(`/admin/network/${id}`);
export const createNetwork = form => http.post('/admin/network', form);
export const deleteNetwork = id => http.delete(`/admin/network/${id}`);
export const leaveNetwork = (id,form) => http.post(`/admin/network/${id}/disconnect`,form);