const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const webpack = require("webpack");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Dodaj fallbacki dla brakujących modułów Node.js
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    util: require.resolve("util"),
    process: require.resolve("process"),
    vm: false,
  };

  // Dodaj plugin do obsługi Buffer i process
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    })
  );

  return config;
};
