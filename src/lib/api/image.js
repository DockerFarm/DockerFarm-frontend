import http from 'lib/httpClient';

export const getImageList = () => http.get('/admin/image');
export const getImageInfo = id => http.get(`/admin/image/${id}`);
export const deleteImage = id => http.delete(`/admin/image/${id}`);