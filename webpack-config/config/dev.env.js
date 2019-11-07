const config = require('./index');

module.exports = {
    APP_TITLE: `"${config.siteSettings.title}"`,
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    MOCK_API: '"mock-api/v1"',
    BASE_API: '"https://api.github.com"'
};
