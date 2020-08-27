var fetch = require('node-fetch');
var db = require('../config/db');
var mysql = require('mysql');
var pool = mysql.createPool(db.mysql)

var spider = {
    hellokitty: function () {
        return 'hello kitty';
    },


    /**
     * 更新区县基础数据，若存在也要删除之前的数据
     */
    async updateMarkets() {
        console.log('抓取区县数据...');
        try {
            var response = await fetch('https://www.gec123.com/xygh/api/v1/header/allMarket');
            var markets = await response.json(); 
            if(!markets) throw 'markets is null';
            var result = await this.insertMarkets(markets.data.markets);
            return result;
        } catch (error) {
            throw (error);//抛异常统一处理返回
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
                if (err) { throw err; }
                //1.删除原有数据
                connection.query('delete from markets', function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }
                    console.log('1.删除原有数据');

                });
                //2.设置id的初始值                        
                connection.query('alter table markets AUTO_INCREMENT=1', function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }
                    console.log('2.设置id的初始值');

                });
                //3.更新区县基础数据
                // result = { mid: 22, name: '33333', flag: 22, ord: 22 };
                var data = [];
                // markets.

                for(var i = 0;i<Object.keys(markets.主城九区).length;i++){
                    var e = markets.主城九区[i];
                    data.push([e.id,e.flag,e.name,e.ord]);
                }

                for(var j = 0;j<Object.keys(markets.渝东北地区).length;j++){
                    var l = markets.渝东北地区[j];
                    data.push([l.id,l.flag,l.name,l.ord]);
                }





                connection.query('insert into markets (id,flag,name,ord) values ?', [data], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }
                    console.log('3.更新区县基础数据');

                });

                //4.提交事务
                connection.commit(function (err) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        });
                    }
                    console.log('success!');
                    connection.release();
                    console.log('4.提交事务');
                    rtn = 1;
                    console.log('【改变rtn值】', rtn);
                    return rtn;
                });

            });
        });

    }


};



pool.on('acquire', function (connection) {
    console.log('连接ID %d 已获取', connection.threadId);
});


pool.on('connection', function (connection) {
    console.log('连接池已连接');
});

pool.on('release', function (connection) {
    console.log('连接ID %d 已释放', connection.threadId);
});

module.exports = spider;