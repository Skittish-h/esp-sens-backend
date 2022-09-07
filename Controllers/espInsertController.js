// file specifically for esp32 inserts with get parameters
const EspPoint = require("../Models/espPointModel");
const Authenticator = require("./authenticateController")

// mapping three letter abbreviations onto the Time Series database measurement
const typeConverter = {
    "TMP":"temperature",
    "HMD":"humidity",
    "PHS":"phvalue"
}

// function that handles requests from esp
const handleESP32 = (req, res) => {
    // no data just respond OK
    if(parseInt(req.query.empty) == 1) {
        res.sendStatus(200);
        return;
    }
    
    
    // Authenticate name of sensor module and password
    Authenticator(req.query.name, req.query.password, (isAutheticated) => {
        
        // if authenticated
        if(isAutheticated) {
            // get the data, convert from base64 and take the JSON value
            var data = Buffer(req.query.data, "base64");
            var dataPoints = JSON.parse(data.toString("ascii"));
            
            // iterate over every sensor-value pair
            Object.entries(dataPoints).forEach(entry => {
                // split each entry into sensor and measurement
                const [sensor, measurement] = entry;
                // extract the first 3 letters to get the sensor type
                var sensorType = typeConverter[sensor.slice(0,3)];
                // inserting points 
                EspPoint.insertPoint(sensorType, req.query.name, sensor, parseFloat(measurement));
                // DEBUG
                console.log("Logging sensor: " ,sensor, measurement, typeConverter[sensor.slice(0,3)]);
            });
            // Send OK
            res.sendStatus(200);
        
        } else {
            console.log("Device: \"", req.query.name, "\" incorrect name or password");
            // Not authorized
            res.sendStatus(403);
        }
    })
}

module.exports = handleESP32;