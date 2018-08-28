import http from 'lib/httpClient';

export const getImageList = () => http.get('/admin/image');
export const getImageInfo = id => http.get(`/admin/image/${id}`);
export const deleteImage = id => http.delete(`/admin/image/${id}`);
export const searchImage = query => http.get(`/admin/image/search?query=${query}`);
export const pruneImage= _ => http.post('/admin/image/prune');