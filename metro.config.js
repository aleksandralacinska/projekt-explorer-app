const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url === "/service-worker.js") {
        res.setHeader("Content-Type", "application/javascript");
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
