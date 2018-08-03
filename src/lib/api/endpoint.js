import http from 'lib/httpClient';

export const selectAllEndpoint = () => http.get('/user/endpoint');
export const addEndpoint = form => http.post('/user/endpoint', form);