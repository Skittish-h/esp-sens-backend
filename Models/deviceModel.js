const sql = require("./sqlModel");

// deviceModel.js
module.exports = {
    // query device by its name with async SQL
    getDeviceByName:(name, callback) => {
        // run callback with query results
        return sql.query(`SELECT * FROM devices WHERE name=?`, [name], (err, results) =>{
            if (err) throw err; 
            return callback(results[0]);
        });
    }
};