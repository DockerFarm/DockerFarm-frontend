import http from 'lib/httpClient';

export const getContainerList = () => http.get('/admin/container');
export const getContainerInfo = id => http.get(`/admin/container/${id}`);
export const getContainerInspectRaw = id => http.get(`admin/container/${id}/raw`);
export const commandToContainer = ({id, command}) => http.post(`/admin/container/${id}/${command}`);
export const pruneContainer = _ => http.post('/admin/container/prune');