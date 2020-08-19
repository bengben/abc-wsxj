var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const spider = require('../bin/spider');

/* GET home page. */
router.get('/', function(req, res, next) {
  spider.hellokitty();
  res.render('index', { title: 'Express' });
});

module.exports = router;
