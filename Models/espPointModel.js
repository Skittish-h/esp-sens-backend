const influx = require("./influxModel");

// function that insertss esp 32 data point into time series database, m_type must be temperature, humidity or ph
const insertEsp32Point = (m_type ,nunit, nsensor, ndata) => {
    
    // nessecary to initialize accoridng to m_type
    var fields = {};
    fields[m_type] = ndata;

    influx.writePoints([
        {
            measurement: m_type,
            tags: {
                unit: `${nunit}`,
                sensor: `${nsensor}`,
            },
            fields: fields,
        }
    ]).catch(error => {
        console.error(`Error saving data to InfluxDB! ${error.stack}`)
    });
}

module.exports = {
    insertPoint: insertEsp32Point
};