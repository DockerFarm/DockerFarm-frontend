import axios from 'axios';
import config from 'config';


const instance = axios.create({
    baseURL : config.backendUrl
});

axios.defaults.withCredentials = true;
export default instance;