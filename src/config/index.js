const config = {
    development : {
        backendUrl : 'http://localhost:3000'
    },
    production : {
        backendUrl : 'http://api.dockerfarm.cf'
    }
}

const env = process.env.NODE_ENV || 'dev';

export default config[env];