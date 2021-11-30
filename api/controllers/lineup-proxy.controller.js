const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports.scanResultGet = function (req, res) {
  return res.json({success: true})
}
