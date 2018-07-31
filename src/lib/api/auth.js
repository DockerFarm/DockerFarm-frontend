import http from 'lib/httpClient';

export const login = form => http.post('/auth/login', form);
export const signup = form => http.post('/auth/register', form);