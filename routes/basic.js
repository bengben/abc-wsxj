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


/**
 * 更新项目信息
 */
 router.get('/updateProjects',  function (req, res, next) {

   var result  =  spider.updateAllProjects();
   if(!result){
      res.json({ success: -1, data: null, msg: e });
   }
   res.json({ success: 1, data: result, msg: '入库成功' });

    
});














module.exports = router;