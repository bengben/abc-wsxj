const express = require('express');
const router = express.Router();
const spider = require('../lib/spider');
const superagent = require('superagent');
const cheerio = require('cheerio');


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
  spider.updateMarkets().then(function (result) {
    console.log('1111111111')
    res.json(result)
    // res.render('index', { title: 'spider对象:' + Object.keys(result.data.markets.主城九区).length });
  }).catch(function (e) {
    res.json({ success: -1, data: null, msg: e })
  });
});


module.exports = router;
