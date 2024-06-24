/*
Webpack overrides file, used by react-app-rewired

config-overrides.js
*/

module.exports = function override(config, env) {
    const resolve = {
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc'
            },
        }

        config.resolve = resolve;
    return config;
}