const config = require('./index');

module.exports = {
    APP_TITLE: `"${config.siteSettings.title}"`,
    NODE_ENV: '"production"',
    ENV_CONFIG: '"prod"',
    BASE_API: '"https://api-prod"'
};
