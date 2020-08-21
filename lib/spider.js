const fetch = require('node-fetch');
const db = require('../config/db');
const mysql = require('mysql');
const pool = mysql.createPool(db.mysql)

let spider = {
    hellokitty: function () {
        return 'hello kitty';
    },




    /**
     * 更新区县基础数据到库
     */
    async updateMarkets() {
        let data    = await this.allMarkets();
        let rtn     = await this.insertMarkets(data);
        return rtn;

    },


    /**
     * 获取区县基础数据
     */
    async allMarkets() {
        console.log('抓取区县数据...');
        try {
            const response = await fetch('https://www.gec123.com/xygh/api/v1/header/allMarket');
            const json = await response.json();
            
            return json;
        } catch (error) {
            throw (error);//抛异常统一处理返回
        }

    },

    async insertMarkets(data) {
        console.log('获取data:')
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

                })
                //2.设置id的初始值                        
                connection.query('alter table markets AUTO_INCREMENT=2', function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }
                    console.log('2.设置id的初始值');

                })
                //3.更新区县基础数据
                result = { mid: 22, name: '33333', flag: 22, ord: 22 };
                connection.query('insert into markets set ?', result, function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }
                    console.log('3.更新区县基础数据');

                })

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