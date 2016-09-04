/*
* $ npm install sandeepmistry/node-sensortag ## (require `libbluetooth-dev`)
* $ TI_UUID=your_ti_sensor_tag_UUID node this_file.js
*/
//var myUUID = process.env["TI_UUID"] || "YOUR_TI_sensor_tag_UUID";
//var myAddress = process.env["TI_ADDRESS"] || "YOUR_TI_sensor_tag_ADDRESS";
var mqtt    = require('mqtt');
var async = require('async');
var client  = mqtt.connect('mqtt://localhost');
var conLimit = 2
var conNum = 0

function getTopicName(sensorTag, shortName) {
  var myAddrArr = sensorTag.address.split(":")
  var shortId = myAddrArr[myAddrArr.length-2] + myAddrArr[myAddrArr.length-1]
  return shortId.toUpperCase() + "/" + shortName
}

function ti_simple_key(conned_obj) {
  var shortname = "swc"
  var topic = getTopicName(conned_obj, shortname)
  conned_obj.notifySimpleKey(function() {
    conned_obj.on("simpleKeyChange", function(left, right) { /* run per pushed button */
      var data = {"right": right, "left": left}
      client.publish(topic, JSON.stringify(data));
    });
  });
}
 
function ti_gyroscope(conned_obj) {
  var shortname = "gyr"
  var topic = getTopicName(conned_obj, shortname)
  var period = 100; // ms
  conned_obj.enableGyroscope(function() {
    conned_obj.setGyroscopePeriod(period, function() {
      conned_obj.notifyGyroscope(function() {
        conned_obj.on('gyroscopeChange', function(x, y, z) {
          var data = {"x": x, "y": y, "z":z}
          client.publish(topic, JSON.stringify(data));
        });
      });
    });
  });
}
 
function ti_ir_temperature(conned_obj) {
  var shortname = "tmp"
  var topic = getTopicName(conned_obj, shortname)
  var period = 300; // ms
  conned_obj.enableIrTemperature(function() {
    conned_obj.setIrTemperaturePeriod(period, function() {
      conned_obj.notifyIrTemperature(function() {
        conned_obj.on('irTemperatureChange', function(objectTemperature, ambientTemperature) {
            var data = {"obj": objectTemperature, "amb": ambientTemperature}
            client.publish(topic, JSON.stringify(data));
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
        conned_obj.on('accelerometerChange', function(x, y, z) {
            var data = {"x": x, "y": y, "z":z}
            client.publish(topic, JSON.stringify(data));
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
        conned_obj.on('humidityChange', function(temperature, humidity) {
            var data = {"tmp": temperature,"hum": humidity}
            client.publish(topic, JSON.stringify(data));
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
        conned_obj.on('magnetometerChange', function(x, y, z) {
            var data = {"x": x, "y": y, "z":z}
            client.publish(topic, JSON.stringify(data));
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
        conned_obj.on('barometricPressureChange', function(pressure) {
            var data = {"brm": pressure}
            client.publish(topic, JSON.stringify(data));
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
        conned_obj.on('luxometerChange', function(lux) {
          var data = {"lux": lux}
          client.publish(topic, JSON.stringify(data));
        });
      });
    });
  });
}
 
var SensorTag = require('sensortag');
var ids = require("./sensorlist")
var asynchronous = true;

console.info(">> STOP: Ctrl+C or SensorTag power off");
console.info("start");
function onDiscover(sensorTag) {
  
  if (ids.indexOf(sensorTag._peripheral.address.toUpperCase()) != -1 ){
    conNum++
    console.dir(conNum)
    if (conNum > conLimit) {
      console.dir("reach connection limit :" + conLimit)
      SensorTag.stopDiscoverAll(onDiscover);
   //   return
    }
    console.dir(sensorTag._peripheral.address.toUpperCase())
    sensorTag.connectAndSetup(function() {
      //if connected, LED turn to Red.
      console.dir("1")
      sensorTag.writeIoConfig(1, function() {
        console.dir("2")
        sensorTag.writeIoData(1)
      });
      console.dir("3")
      sensorTag.readDeviceName(function(error, deviceName) {
        console.dir("4")
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
  }
  /* In case of SensorTag PowerOff or out of range when fired `onDisconnect` */
//  sensorTag.once("disconnect", function() {
//    console.info("disconnect and exit");
////    client.end();
////    process.exit(0);
//  });
};

SensorTag.discoverAll(onDiscover)
if (conNum > conLimit) {
  console.dir("stopDiscoverAll")
}
