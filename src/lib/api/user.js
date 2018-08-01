import http from 'lib/httpClient';

export const selectMyInfo = form => http.get('/user/me');

