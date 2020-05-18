let config = {
    API_PREFIX: 'https://dev.example.com',
};

const nodeEnv = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'staging') {
    config.API_PREFIX = 'https://stage.example.com';
}

if (nodeEnv === 'production') {
    config.API_PREFIX = 'https://www.example.com';
}

export default config;
