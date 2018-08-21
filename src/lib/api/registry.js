import http from 'lib/httpClient';

export const getRegistryList = _ => http.get('/admin/registry');
export const createRegistry = form => http.post('/admin/registry', form);
export const updateRegistry = (id, form) => http.put(`/admin/registry/${id}`, form);
export const deleteRegistry = id => http.delete(`/admin/registry/${id}`);
export const getRegistryInfo = id => http.get(`/admin/registry/${id}`);