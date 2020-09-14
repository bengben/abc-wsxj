var express = require("express");
var router = express.Router();
var spider = require("../lib/spider");
var db = require("../config/db");

/**
 * 更新区县基础数据到库
 */
router.get("/updateMarkets", function (req, res, next) {
  spider.updateMarkets();
});

/**
 * 初始化项目信息
 */
router.get("/initProjects", function (req, res, next) {
  spider.initAllProjects(res);
});


/**
 * 初始化项目信息
 */
router.get("/updateProjects", function (req, res, next) {
  spider.updateProjects(res);
});


/**
 * 得到项目详细信息
 */
router.get("/initPackage", async function (req, res, next) {
  console.log('/initPackage');
  // spider.initProjectDetail(res);
  // res.send(result);
  spider.getInfoById();
  // var a = await spider.getInfoById();
  // var b = await spider.getAttchments();
  // console.log('aaaaaa:', a);
  // console.log('bbbbbb:', b);
});





module.exports = router;