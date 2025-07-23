const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

if (process.env.NODE_ENV === 'production') {
  config.transformer.minifierConfig = {
    ...config.transformer.minifierConfig,
    compress: {
      ...config.transformer.minifierConfig?.compress,
      drop_console: true,
      drop_debugger: true,
    },
  };
}

module.exports = config; 