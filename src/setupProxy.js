const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.stlouisfed.org/fred",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
