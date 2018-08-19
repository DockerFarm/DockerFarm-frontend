import http from 'lib/httpClient';
import { objectToQueryString } from 'lib/util';

export const getLibraryList = param => http.get(`/admin/library?${objectToQueryString(param)}`);
