const { name } = require("./package");
module.exports = {
  devServer: {
    port: 8881,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack() {
    return {
      output: {
        library: `${name}-[name]`,
        libraryTarget: "umd", // 把微应用打包成 umd 库格式
        jsonpFunction: `webpackJsonp_${name}`,
      },
    };
  },
};
