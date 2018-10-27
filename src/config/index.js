const config = {
    development : {
        backendUrl: 'http://localhost:3000'
    },
    production : {
        backendUrl : 'https://api.dockerfarm.io'
    }
}

const env = process.env.NODE_ENV || 'development';

export default config[env];
