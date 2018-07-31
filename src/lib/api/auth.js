import http from 'lib/httpClient';

export const login = form => http.post('/auth/login', form);