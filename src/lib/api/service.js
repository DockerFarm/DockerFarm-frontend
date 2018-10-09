import http from 'lib/httpClient';
import qs from 'query-string';

export const getServiceList = _ => http.get(`/admin/service`);
export const getServiceInfo = id => http.get(`/admin/service/${id}`);
export const getServiceLog = ({id, param}) => http.get(`/admin/service/${id}/log?${qs.stringify(param)}`);
export const deleteService = id => http.delete(`/admin/service/${id}`);
