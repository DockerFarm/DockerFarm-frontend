import http from 'lib/httpClient';

export const getSwarmInfo = _ => http.get(`/admin/swarm`);
export const swarmInit = form => http.post(`/admin/swarm/init`,form);
export const swarmLeave = _ => http.post(`/admin/swarm/leave`);
export const swarmJoin = form => http.post(`/admin/swarm/join`, form);
export const getSwarmToken = _ => http.get(`/admin/swarm/token`);  

