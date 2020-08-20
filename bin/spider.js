const fetch = require('node-fetch');
const db = require('../config/db');
const mysql = require('mysql');
const Promise = require('promise');
const pool = mysql.createPool(db.mysql)

let spider = {
    hellokitty: function () {
        return 'hello kitty';
    },

    saveAllMarkets: function (data) {
        (async () => {
            const response = await fetch('https://www.gec123.com/xygh/api/v1/header/allMarket');
            const json = await response.json();
            // console.log(Object.keys(json.data.markets.主城九区).length);

            pool.getConnection(function (err, connetction) {
                if (err) throw err; // not connected!
                connetction.query('insert into markets set ?,?,?,?', data, function (error, results, fields) {
                    console.log('保存后的ID：', results.insertId);
                    connetction.release();
                });

            });


        })();// end async()
    },

    
    /**
     * 获取区县基础数据
     */
    async allMarkets() {
        const response = await fetch('https://www.gec123.com/xygh/api/v1/header/allMarket');
        const json = await response.json();
        return json;
    },


};


module.exports = spider;