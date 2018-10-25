const config = {
    development : {
        backendUrl: 'http://api.dockerfarm.io'
    },
    production : {
        backendUrl : 'http://api.dockerfarm.io'
    }
}

const env = process.env.NODE_ENV || 'dev';

export default config[env];
