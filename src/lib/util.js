import { reduce, concat } from 'lodash';

export const objectToQueryString = obj => reduce(obj, (acc, v, k) => concat(acc, `${k}=${v}`),[]).join('&')