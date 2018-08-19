import http from 'lib/httpClient';

export const getDashBoardInfo = _ => http.get('/admin/dashboard');