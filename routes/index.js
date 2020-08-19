var express = require('express');
var router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
