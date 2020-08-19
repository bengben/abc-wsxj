var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const spider = require('../bin/spider');

/* GET home page. */
router.get('/', function (req, res, next) {

  var promise = new Promise(function (resolve, reject) {
    const len = spider.allMarkets();
    console.log('len:', len)
    res.render('index', { title: len});
  });

    


});

module.exports = router;
