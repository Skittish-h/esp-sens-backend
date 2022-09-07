const bcrypt = require('bcryptjs');
const Device = require("../Models/deviceModel");

// authenticateControllet.js
// function that authenticates a device
const authentiacteDevice = (uName, password, callback) => {
    // if there is no username or password, use is not authenticated
    if(!uName || !password) {
        return callback(false);
    }

    // async SQL query to fetch device
    Device.getDeviceByName(uName, (dev) => {
        // if no device is found authentification failed
        if(!dev) return callback(false);
        
        //if the device is found, use async crypt function to compare hashes 
        bcrypt.compare(password, dev.password, (err, res) => {
            if (err) throw err;
            // run callback with comparison result
            callback(res);
        });
    });
} 

module.exports = authentiacteDevice;