var fetch = require("node-fetch");
var db = require("../config/db");
var mysql = require("mysql");
var pool = mysql.createPool(db.mysql);

var spider = {
  hellokitty: function () {
    return "hello kitty";
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
    await pool.getConnection(function (err, connection) {
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
   * 插入项目信息
   */
  async updateProjects() {
    var url,
      base_url = "https://xj.ccgp-chongqing.gov.cn/enquiry/api/v1/packages?";
    var response = await fetch(
      "https://xj.ccgp-chongqing.gov.cn/enquiry/api/v1/packages?pi=1&ps=12&quota=2"
    );
    var allData = await response.json();
    if (!allData) throw "markets is null";
    var total_page = Math.ceil(allData.total / 100);

    for (var p = 1; p <= total_page; p++) {
      // https://xj.ccgp-chongqing.gov.cn/enquiry/api/v1/packages?pi=1&ps=12&quota=2
      url = base_url + "pi=" + p + "&ps=100&quota=2";
      var response_project = await fetch(url);
      var projects = await response_project.json();

      console.log(">>>>>>>>>>>>>>>>>>",projects);
    }

    await pool.getConnection(function (err, connection) {});
  },
};

pool.on("acquire", function (connection) {
  console.log("连接ID %d 已获取", connection.threadId);
});

pool.on("connection", function (connection) {
  console.log("连接池已连接");
});

pool.on("release", function (connection) {
  console.log("连接ID %d 已释放", connection.threadId);
});

module.exports = spider;
