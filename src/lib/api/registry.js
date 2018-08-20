import http from 'lib/httpClient';

export const getRegistryList = _ => http.get('/admin/registry');
