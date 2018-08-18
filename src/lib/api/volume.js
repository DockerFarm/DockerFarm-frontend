import http from 'lib/httpClient';

export const getVolumeList = _ => http.get('/admin/volume');
export const getVolumeInfo = id => http.get(`/admin/volume/${id}`);
export const getVolumeDriverList = _ => http.get('/admin/volume/driver');
export const createVolume = form => http.post('/admin/volume', form);
export const deleteVolume = id => http.delete(`/admin/volume/${id}`);