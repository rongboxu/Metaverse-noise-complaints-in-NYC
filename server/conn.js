const mysql = require("mysql")
const util = require('util');

const pool = mysql.createPool({
 
    host:"dev.spatialdatacapture.org", 
    user:"ucfnxua", 
    password:"fezucokaqo", 
    port:3306, 
    database:"ucfnxua" 
})


 //sql
const query = util.promisify(pool.query).bind(pool);


module.exports = {
    query: query,
}