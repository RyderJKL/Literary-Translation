const config = require('./index');

module.exports = {
    APP_TITLE: `"${config.siteSettings.title}"`,
    APP_NAME: `"${config.appName}"`,
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    MOCK_API: '"/mock-api/v1"',
    BASE_API: '"/api"'
};
