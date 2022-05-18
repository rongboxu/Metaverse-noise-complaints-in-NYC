const mysql = require("mysql")
const util = require('util');

const pool = mysql.createPool({
    //地址
    host:"dev.spatialdatacapture.org", 
    //用户名
    user:"ucfnxua", 
    //密码
    password:"fezucokaqo", 
    //端口
    port:3306, 
    //数据库_库名
    database:"ucfnxua" 
})


 //sql
const query = util.promisify(pool.query).bind(pool);


module.exports = {
    query: query,
}