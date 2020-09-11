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
router.get("/initPackage", function (req, res, next) {
  res.send(spider.getInfoById(879767969620824064));
});

 



module.exports = router;
