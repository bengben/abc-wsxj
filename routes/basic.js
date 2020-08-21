const express = require('express');
const router = express.Router();
const spider = require('../lib/spider');
const db = require('../config/db');



/**
 * 更新区县基础数据到库
 */
router.get('/updateMarkets',  function (req, res, next) {

    let  rtn = spider.updateMarkets().then(function(result){
        console.log('=========2>>>>>>>>>>>>>>',result)
    });
    console.log('=============>',rtn)
    
});











module.exports = router;