import http from 'lib/httpClient';

export const getVolumeList = _ => http.get('/admin/volume');
export const getVolumeInfo = id => http.get(`/admin/volume/${id}`);
