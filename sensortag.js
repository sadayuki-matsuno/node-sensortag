/*
* $ npm install sandeepmistry/node-sensortag ## (require `libbluetooth-dev`)
* $ TI_UUID=your_ti_sensor_tag_UUID node this_file.js
*/
//var myUUID = process.env["TI_UUID"] || "YOUR_TI_sensor_tag_UUID";
//var myAddress = process.env["TI_ADDRESS"] || "YOUR_TI_sensor_tag_ADDRESS";
var mqtt    = require('mqtt');
var async = require('async');
var client  = mqtt.connect('mqtt://localhost');

function getTopicName(sensorTag, shortName) {
  var myAddrArr = sensorTag.address.split(":")
  var shortId = myAddrArr[myAddrArr.length-2] + myAddrArr[myAddrArr.length-1]
  return shortId.toUpperCase() + "/" + shortName
}

function ti_simple_key(conned_obj) {
  var shortname = "swc"
  var topic = getTopicName(conned_obj, shortname)
  conned_obj.notifySimpleKey(function() {
    console.info("ready: notifySimpleKey");
    console.info("/* left right (true = pushed, false = released) */");
    conned_obj.on("simpleKeyChange", function(left, right) { /* run per pushed button */
//スイッチ
//      console.log(left, right);
      var data = {"right": right, "left": left}
      client.publish(topic, JSON.stringify(data));
    });
  });
}
 
function ti_gyroscope(conned_obj) {
  var shortname = "gyr"
  var topic = getTopicName(conned_obj, shortname)
  console.dir(topic)
  var period = 100; // ms
  conned_obj.enableGyroscope(function() {
    conned_obj.setGyroscopePeriod(period, function() {
      conned_obj.notifyGyroscope(function() {
        console.info("ready: notifyGyroscope");
        console.info("notify period = " + period + "ms");
        conned_obj.on('gyroscopeChange', function(x, y, z) {
//ジャイロセンサー
          var data = {"x": x, "y": y, "z":z}
          client.publish(topic, JSON.stringify(data));
          
//          console.log('gyro_x: ' + x, 'gyro_y: ' + y, 'gyro_z: ' + z);
        });
      });
    });
  });
}
 
function ti_ir_temperature(conned_obj) {
  var shortname = "tmp"
  var topic = getTopicName(conned_obj, shortname)
  var period = 100; // ms
  conned_obj.enableIrTemperature(function() {
    conned_obj.setIrTemperaturePeriod(period, function() {
      conned_obj.notifyIrTemperature(function() {
        console.info("ready: notifyIrTemperature");
        console.info("notify period = " + period + "ms");
        conned_obj.on('irTemperatureChange', function(objectTemperature, ambientTemperature) {
            var data = {"obj": objectTemperature, "amb": ambientTemperature}
            client.publish(topic, JSON.stringify(data));
//物体温度
//            console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
//周辺温度
 //           console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1));
        });
      });
    });
  });
}
 
function ti_accelerometer(conned_obj) {
  var shortname = "acc"
  var topic = getTopicName(conned_obj, shortname)
  var period = 100; // ms
  conned_obj.enableAccelerometer(function() {
    conned_obj.setAccelerometerPeriod(period, function() {
      conned_obj.notifyAccelerometer(function() {
        console.info("ready: notifyAccelerometer");
        console.info("notify period = " + period + "ms");
        conned_obj.on('accelerometerChange', function(x, y, z) {
            var data = {"x": x, "y": y, "z":z}
            client.publish(topic, JSON.stringify(data));
//加速度
//            console.log('\taccel_x = %d G', x.toFixed(1));
//            console.log('\taccel_y = %d G', y.toFixed(1));
//            console.log('\taccel_z = %d G', z.toFixed(1));
        });
      });
    });
  });
}
 
function ti_humidity(conned_obj) {
  var shortname = "hmd"
  var topic = getTopicName(conned_obj, shortname)
  var period = 100; // ms
  conned_obj.enableHumidity(function() {
    conned_obj.setHumidityPeriod(period, function() {
      conned_obj.notifyHumidity(function() {
        console.info("ready: notifyHumidity");
        console.info("notify period = " + period + "ms");
        conned_obj.on('humidityChange', function(temperature, humidity) {
            var data = {"tmp": temperature,"hum": humidity}
            client.publish(topic, JSON.stringify(data));
//            console.log('\ttemperature = %d °C', temperature.toFixed(1));
//湿度
//           console.log('\thumidity = %d %', humidity.toFixed(1));
        });
      });
    });
  });
}
 
function ti_magnetometer(conned_obj) {
  var shortname = "mgn"
  var topic = getTopicName(conned_obj, shortname)
  var period = 100; // ms
  conned_obj.enableMagnetometer(function() {
    conned_obj.setMagnetometerPeriod(period, function() {
      conned_obj.notifyMagnetometer(function() {
        console.info("ready: notifyMagnetometer");
        console.info("notify period = " + period + "ms");
        conned_obj.on('magnetometerChange', function(x, y, z) {
            var data = {"x": x, "y": y, "z":z}
            client.publish(topic, JSON.stringify(data));
//磁力
//            console.log('\tmagnet_x = %d μT', x.toFixed(1));
//            console.log('\tmagnet_y = %d μT', y.toFixed(1));
//            console.log('\tmagnet_z = %d μT', z.toFixed(1));
        });
      });
    });
  });
}
 
function ti_barometric_pressure(conned_obj) {
  var shortname = "brm"
  var topic = getTopicName(conned_obj, shortname)
  var period = 100; // ms
  conned_obj.enableBarometricPressure(function() {
    conned_obj.setBarometricPressurePeriod(period, function() {
      conned_obj.notifyBarometricPressure(function() {
        console.info("ready: notifyBarometricPressure");
        console.info("notify period = " + period + "ms");
        conned_obj.on('barometricPressureChange', function(pressure) {
            var data = {"brm": pressure}
            client.publish(topic, JSON.stringify(data));
//圧力
//            console.log('\tpressure = %d mBar', pressure.toFixed(1));
        });
      });
    });
  });
}
 
function ti_luxometer(conned_obj) {
  var shortname = "lux"
  var topic = getTopicName(conned_obj, shortname)
  var period = 100; // ms
  conned_obj.enableLuxometer(function() {
    conned_obj.setLuxometerPeriod(period, function() {
      conned_obj.notifyLuxometer(function() {
        console.info("ready: notifyLuxometer");
        console.info("notify period = " + period + "ms");
        conned_obj.on('luxometerChange', function(lux) {
          var data = {"lux": lux}
          client.publish(topic, JSON.stringify(data));
//光
//          console.log('\tlux = %d', lux.toFixed(1));
        });
      });
    });
  });
}
 
var SensorTag = require('sensortag');
var ids = require("./private_ids")
var asynchronous = true;

var myAddress = ids[0]
//if (asynchronous) {
//    async.forEach(ids, function(deviceMac, callback) {
//      //directly connect to device
//      SensorTag.discoverByAddress(deviceMac, function(err) {
//        callback();
//        console.log("found " + deviceMac);
//      });
//    }, function (err) {
//      console.log('All found!');
//    });
//}
console.info(">> STOP: Ctrl+C or SensorTag power off");
console.info("start");
//console.info("waiting for connect from " + myAddress);
//SensorTag.discoverByUuid(myUUID, function(sensorTag) {
//SensorTag.discoverByAddress(myAddress, function(sensorTag) {
SensorTag.discoverAll(function(sensorTag) {
  console.info("found: connect and setup ... (waiting 5~10 seconds)");
  // if connected, LED turn to Red.
  sensorTag.connectAndSetup(function() {
//    sensorTag.writeIoConfig(1, function() {
//      sensorTag.writeIoData(1)
//    });
    sensorTag.readDeviceName(function(error, deviceName) {
      console.info("connect: " + deviceName);
      ti_simple_key(sensorTag);
      ti_gyroscope(sensorTag);
      ti_ir_temperature(sensorTag);
      ti_accelerometer(sensorTag);
      ti_humidity(sensorTag);
      ti_magnetometer(sensorTag);
      ti_barometric_pressure(sensorTag);
      ti_luxometer(sensorTag);
    });
  });
  /* In case of SensorTag PowerOff or out of range when fired `onDisconnect` */
  sensorTag.once("disconnect", function() {
    console.info("disconnect and exit");
    client.end();
    process.exit(0);
  });
});
