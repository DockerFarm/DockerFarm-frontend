const config = {
    development : {
        backendUrl: 'http://api.dockerfarm.cf'
    },
    production : {
        backendUrl : 'http://api.dockerfarm.cf'
    }
}

const env = process.env.NODE_ENV || 'dev';

export default config[env];