// File that handles direct interaction with the InfluxDB
const Influx = require('influx');

// Just define a InfluxDB instance
const influxModel = new Influx.InfluxDB({
    host: 'localhost',
    database: 'smart_novacultura',
    schema: [
      {
        measurement: 'temperature',
        fields: {
          temperature: Influx.FieldType.FLOAT
        },
        tags: [
          'unit',
          'sensor'
        ]
      },
      {
        measurement: 'humidity',
        fields: {
            humidity: Influx.FieldType.FLOAT
        },
        tags: [
          'unit',
          'sensor'
        ]
      },
      {
        measurement: 'camera',
        fields: {
            video: Influx.FieldType.STRING
        },
        tags: [
          'unit'        
        ]
      }
    ]
   })

  //  Export thr influxDB instance
module.exports = influxModel;