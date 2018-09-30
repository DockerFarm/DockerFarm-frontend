import http from 'lib/httpClient';
import qs from 'query-string';

export const getContainerList = () => http.get('/admin/container');
export const getContainerInfo = id => http.get(`/admin/container/${id}`);
export const getContainerLog = ({ id, param }) => http.get(`/admin/container/${id}/log?${qs.stringify(param)}`);
export const getContainerInspectRaw = id => http.get(`admin/container/${id}/raw`);
export const commandToContainer = ({id, command}) => http.post(`/admin/container/${id}/${command}`);
export const pruneContainer = _ => http.post('/admin/container/prune');
export const createContainer = form => http.post('/admin/container/create', form);
