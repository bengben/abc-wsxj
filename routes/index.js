const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const spider = require('../bin/spider');

/* GET home page. */
router.get('/', function (req, res, next) {
  spider.allMarkets().then(function (result) {
    res.render('index', { title: 'spider对象:' + Object.keys(result.data.markets.主城九区).length });
  });
});



/**
 * api
 * desc：获取区县基础数据
 */
router.get('/s/v1/allMarkets', function (req, res, next) {
  spider.allMarkets().then(function (result) {
    res.json(result)
    // res.render('index', { title: 'spider对象:' + Object.keys(result.data.markets.主城九区).length });
  });
});


// return Object.keys(json.data.markets.主城九区).length;
module.exports = router;
