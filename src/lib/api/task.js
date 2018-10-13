import http from 'lib/httpClient';
import qs from 'query-string';

export const getTaskList = id => http.get(`/admin/task/${id}`);
export const getTaskInfo = id => http.get(`/admin/task/${id}/info`);
export const getTaskLog = ({id, param}) => http.get(`/admin/task/${id}/log?${qs.stringify(param)}`);
