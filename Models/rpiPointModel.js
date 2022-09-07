const influx = require("./influxModel");

const insertRpiPoint = (nunit, nlink) => {
    influx.writePoints([
        {
            measurement: "camera",
            tags: {
                unit: `${nunit}`,
            },
            fields: {video: nlink},
        }
    ]).catch(error => {
        console.error(`Error saving data to InfluxDB! ${error.stack}`)
    });
}

module.exports = {
    insertPoint: insertRpiPoint
};