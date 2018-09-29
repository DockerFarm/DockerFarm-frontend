import http from 'lib/httpClient';

export const getEventList = _ => http.get('/admin/event');
