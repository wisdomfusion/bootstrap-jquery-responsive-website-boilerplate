let config = {
    API_PREFIX: 'https://dev.example.com',
};

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'production') {
    config.API_PREFIX = 'https://www.example.com';
}

export default config;
