import http from 'lib/httpClient';

export const selectAllEndpoint = () => http.get('/admin/endpoint');
export const addEndpoint = form => http.post('/admin/endpoint', form);
export const removeEndpoint = id => http.delete(`/admin/endpoint/${id}`);
export const updateEndpoint = (id,form) => http.put(`/admin/endpoint/${id}`, form);