import http from 'lib/httpClient';

export const getImageList = () => http.get('/admin/image');
