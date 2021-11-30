const express = require('express');
const router = express.Router();

const lineupProxyCtrl = require('../controllers/lineup-proxy.controller')

router.get('/proxy-data', lineupProxyCtrl.scanResultGet)

module.exports = router;
