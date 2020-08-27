var express = require('express');
var router = express.Router();
var spider = require('../lib/spider');
var db = require('../config/db');



/**
 * 更新区县基础数据到库
 */
router.get('/updateMarkets',  function (req, res, next) {

   spider.updateMarkets();
    
});











module.exports = router;