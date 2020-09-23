var fetch = require("node-fetch");
var db = require("../config/db");
var mysql = require("mysql");
var cheerio = require("cheerio");
var superagent = require("superagent");
var pool = mysql.createPool(db.mysql);

var spider = {
  hellokitty: function () {
    return "hello kitty";
  },

  async initProjectDetail(res) {
    var info = await this.getInfoById();
    var attc = await this.getAttchments();
    console.log(" 1.基本信息:", info);
    console.log(" 2.附件信息:", attc);
    res.send(info, attc);
  },
  //   ==============================================================  //
  //爬取基本信息
  //   ==============================================================  //

  async getInfoById(noticeid) {
    console.log(noticeid);
    var url =
      "https://xj.ccgp-chongqing.gov.cn/enquiry/notice!enquiryNotice.action?notic_seq=" +
      noticeid;
    console.log("url:", url);
    superagent.get(url).end(async (err, res) => {
      $ = cheerio.load(res.text);
      var info = {};
      //1. 保存单位基本信息和联系方式
      info.org = $("#center_left_wrap").find("a").eq(1).text();
      info.prj = $(".notice-title").text();
      //获取旧页面元素，形成判断读取数据的flag值
      var old_contact = $(".contactStyle");
      var is_oldpage = old_contact.length>0;//旧页面元素是否有多个来标识是旧页面
      //第一种展现形式获信息
      if (!is_oldpage) {
        console.log("new...");
        info.money = $(".notice-item-sub-title").find("span").text();
        info.buydo = {
          org_remark: $(".notice-contact")
            .eq(0)
            .find(".contact-type-name")
            .text(),
          org_name: $(".contact-detail")
            .find("li")
            .eq(0)
            .find(".contact-content")
            .text(),
          org_person: $(".contact-detail")
            .find("li")
            .eq(1)
            .find(".contact-content")
            .text(),
          org_phone: $(".contact-detail")
            .find("li")
            .eq(2)
            .find(".contact-content")
            .text(),
        }; //采购执行方
        info.buyreq = {
          org_remark: $(".notice-contact.ng-scope")
            .find(".contact-type-name")
            .text(),
          org_name: $(".notice-contact.ng-scope")
            .find("li")
            .eq(0)
            .find(".contact-content")
            .text(),
          org_person: $(".notice-contact.ng-scope")
            .find("li")
            .eq(1)
            .find(".contact-content")
            .text(),
          org_phone: $(".notice-contact.ng-scope")
            .find("li")
            .eq(2)
            .find(".contact-content")
            .text(),
        }; //采购需求方
      }

      //第二种展现形式获信息
      if (is_oldpage) {
        var orgname_str = $(".contactStyle").eq(1).parent().text();
        var org_name = orgname_str.substr(orgname_str.indexOf('：')+1,orgname_str.length).trim();
        info.buydo={org_name:org_name};//org_name = org_name;
        console.log("old...");
        console.log("------>",$(".contactStyle").eq(1).text());
      }

      // var attch =
      console.log("单位：", info);
      // return info;
      var att_url =
        "https://www.ccgp-chongqing.gov.cn/enquiry/notice!getAttachmentsByNotice_seq.action?notic_seq=" +
        noticeid;
      try {
        var response = await fetch(att_url);
        var attachments = await response.json();
        if (!attachments) throw "attachments is null";
        // var result = await this.insertMarkets(markets.data.markets);
        console.log("附件:", attachments);
        return attachments;
      } catch (error) {
        throw error; //抛异常统一处理返回
      }
      return info;
      //2. 保存项目中标信息
      //
    });
  },

  async getAttchments() {
    var att_url =
      "https://www.ccgp-chongqing.gov.cn/enquiry/notice!getAttachmentsByNotice_seq.action?notic_seq=880523582290268160";
    try {
      var response = await fetch(att_url);
      var attachments = await response.json();
      if (!attachments) throw "attachments is null";
      // var result = await this.insertMarkets(markets.data.markets);
      // console.log('附件:', attachments);
      return attachments;
    } catch (error) {
      throw error; //抛异常统一处理返回
    }
  },

  /**
   * 更新区县基础数据，若存在也要删除之前的数据
   */
  async updateMarkets() {
    console.log("抓取区县数据...");
    try {
      var response = await fetch(
        "https://www.gec123.com/xygh/api/v1/header/allMarket"
      );
      var markets = await response.json();
      if (!markets) throw "markets is null";
      var result = await this.insertMarkets(markets.data.markets);
      return result;
    } catch (error) {
      throw error; //抛异常统一处理返回
    }
  },

  /**
   *
   * @param {爬虫得到的区县数据} markets
   */
  async insertMarkets(markets) {
    // console.log('获取data:',markets.主城九区);
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.beginTransaction(function (err) {
        if (err) {
          throw err;
        }
        //1.删除原有数据
        connection.query("delete from markets", function (
          error,
          results,
          fields
        ) {
          if (error) {
            return connection.rollback(function () {
              throw error;
            });
          }
          console.log("1.删除原有数据");
        });
        //2.设置id的初始值
        connection.query("alter table markets AUTO_INCREMENT=1", function (
          error,
          results,
          fields
        ) {
          if (error) {
            return connection.rollback(function () {
              throw error;
            });
          }
          console.log("2.设置id的初始值");
        });
        //3.更新区县基础数据
        var data = [];
        // markets.
        for (var a = 0; a < Object.keys(markets.主城九区).length; a++) {
          var a1 = markets.主城九区[a];
          data.push([a1.id, a1.flag, a1.name, a1.ord]);
        }

        for (var b = 0; b < Object.keys(markets.渝东北地区).length; b++) {
          var b1 = markets.渝东北地区[b];
          data.push([b1.id, b1.flag, b1.name, b1.ord]);
        }

        for (var c = 0; c < Object.keys(markets.其他).length; c++) {
          var c1 = markets.其他[c];
          data.push([c1.id, c1.flag, c1.name, c1.ord]);
        }

        for (var d = 0; d < Object.keys(markets.渝东南地区).length; d++) {
          var d1 = markets.渝东南地区[c];
          data.push([d1.id, d1.flag, d1.name, d1.ord]);
        }

        for (var e = 0; e < Object.keys(markets.渝西地区).length; e++) {
          var e1 = markets.渝西地区[e];
          data.push([e1.id, e1.flag, e1.name, e1.ord]);
        }

        connection.query(
          "insert into markets (id,flag,name,ord) values ?",
          [data],
          function (error, results, fields) {
            if (error) {
              return connection.rollback(function () {
                throw error;
              });
            }
            console.log("3.更新区县基础数据");
          }
        );

        //4.提交事务
        connection.commit(function (err) {
          if (err) {
            return connection.rollback(function () {
              throw err;
            });
          }
          console.log("success!");
          connection.release();
          return true;
        });
      });
    });
  },

  /**
   * 实时更新项目，遇到Id存在就停止插入新项目
   */
  async updateProjects(res) {
    var result;
    var url =
      "https://xj.ccgp-chongqing.gov.cn/enquiry/api/v1/packages?pi=1&ps=100&quota=2";
    var response_project = await fetch(url).catch(function (err) {
      throw err(err);
    });
    var projects_all = await response_project.json();
    var projects_page = projects_all.packages;
    var newsProject = await this.newsProject(projects_page);
    // console.log("newsProject",newsProject);
    // res.json({ success: 1, data: newsProject, msg: "最后一条查询成功" });
    // res.json(newsProject);
  },

  /**
   *  查询最近的一个项目
   */
  async newsProject(projects_page) {
    console.log("news project...");
    var id;
    pool.getConnection(function (err, connection) {
      // 1.删除所有数据
      connection.query(
        "select id from project p ORDER BY pid desc limit 1",
        "",
        function (error, results, fields) {
          if (error) {
            return connection.rollback(function () {
              throw error;
            });
          }
          id = results[0].id;

          // res.json( results[0].id);
          console.log("获取的lastid：", id);
          console.log("传入的lastid：", id);
          connection.release();
        }
      );
    });
  },

  /**
   * 初始化项目信息
   */
  async initAllProjects(res) {
    var pagesize = 100;
    var url,
      result,
      base_url = "https://xj.ccgp-chongqing.gov.cn/enquiry/api/v1/packages?";
    var response = await fetch(
      "https://xj.ccgp-chongqing.gov.cn/enquiry/api/v1/packages?pi=1&ps=12&quota=2"
    ).catch((err) => console.error(err));
    var allData = await response.json();
    if (!allData) throw "markets is null";
    var total_page = Math.ceil(allData.total / pagesize);

    var truncateProjects = await this.truncateProjects();
    var setIncrement = await this.setIncrement();
    console.log("总共项目包个数：", allData.total, " 页数为：", total_page);
    for (var p = total_page; p >= 1; p--) {
      url = base_url + "pi=" + p + "&ps=" + pagesize + "&quota=2";
      console.log("当前页数：", p, "/", total_page, " url:", url);
      // await this.waitfun();
      var response_project = await fetch(url).catch(function (err) {
        console.log(err);
      });
      var projects_all = await response_project.json();
      var projects_page = projects_all.packages;
      result = await this.insertProjects(projects_page, 0);
    }
    res.json({
      success: 1,
      data: result,
      msg: "入库成功",
    });
  },

  /**
   * 清空项目表
   */
  async truncateProjects() {
    pool.getConnection(function (err, connection) {
      // 1.删除所有数据
      connection.query(" truncate   project ", "", function (
        error,
        results,
        fields
      ) {
        if (error) {
          return connection.rollback(function () {
            throw error;
          });
        }
      });
    });
  },

  /**
   * 设置id序号为1
   */
  async setIncrement() {
    pool.getConnection(function (err, connection) {
      // 1.删除所有数据
      connection.query(" alter table project AUTO_INCREMENT=1 ", "", function (
        error,
        results,
        fields
      ) {
        if (error) {
          return connection.rollback(function () {
            throw error;
          });
        }
      });
    });
  },

  //   ==============================================================  //
  //项目入库
  //   ==============================================================  //

  /**
   * 项目入库
   * @param {项目入库} projects
   */
  async insertProjects(projects, lastId) {
    if (!projects) throw "项目为空";
    var length = Object.keys(projects).length;
    var packages = [];

    // 1.获取最后一条的id
    pool.getConnection(function (err, connection) {
      for (var i = length - 1; i >= 0; i--) {
        var p = projects[i];
        // console.log("lastid:",lastId,"p.id:",p.id);
        if (lastId == p.id) break;
        packages.push([
          p.belongToGPW,
          p.buyers,
          p.deliveryAddress,
          p.deliveryTime,
          p.directoryCode,
          p.enqCreateTime,
          p.enqEndTime,
          p.enqStartTime,
          p.enqState,
          p.enquiryId,
          p.enquiryState,
          p.goodsCount,
          p.goodsDirectory,
          p.id,
          p.invite,
          p.noticeId,
          p.noticeName,
          p.noticeType,
          p.packageCount,
          p.packageNo,
          p.publishTime,
          p.quoteCount,
          p.result,
          p.stockOrgAdminAreaId,
          p.stockOrgId,
          p.stockOrgName,
          p.stockOrgUserId,
          p.sysResult,
          p.totalLimit,
        ]);
      }
      // console.log('批量入库数据组装完成：',packages.length);
      connection.beginTransaction(function (err) {
        // 2.项目入库
        connection.query(
          "insert into project (belongToGPW,buyers,deliveryAddress,deliveryTime,directoryCode,enqCreateTime,enqEndTime,enqStartTime,enqState,enquiryId,enquiryState,goodsCount,goodsDirectory,id,invite,noticeId,noticeName,noticeType,packageCount,packageNo,publishTime,quoteCount,result,stockOrgAdminAreaId,stockOrgId,stockOrgName,stockOrgUserId,sysResult,totalLimit) values ?",
          [packages],
          function (error, results, fields) {
            if (error) {
              return connection.rollback(function () {
                throw error;
              });
            }
            // console.log('insert 语句完成');
          }
        );

        //2.提交事务
        connection.commit(function (err) {
          if (err) {
            return connection.rollback(function () {
              throw err;
            });
          }
          // console.log("提交事务");
          connection.release();
          // console.log('完成释放');
          // return true;
        });
      });
    });
  },
};

//   ==============================================================  //
//监听事件
//   ==============================================================  //
pool.on("acquire", function (connection) {
  // console.log("连接ID %d 已获取", connection.threadId);
});

pool.on("connection", function (connection) {
  // console.log("连接池已连接");
});

pool.on("release", function (connection) {
  // console.log("连接ID %d 已释放", connection.threadId);
});

module.exports = spider;
