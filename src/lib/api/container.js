import http from 'lib/httpClient';

export const getContainerList = () => http.get('/admin/container');
export const getContainerInfo = id => http.get(`/admin/container/${id}`);
export const getContainerInspectRaw = id => http.get(`admin/container/${id}/raw`);
export const startContainer = id => http.post(`/admin/container/${id}/start`);
export const stopContainer = id => http.post(`/admin/container/${id}/stop`);