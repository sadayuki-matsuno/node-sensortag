var util = require('util');

var async = require('async');

var SensorTag = require('sensortag');;

var USE_READ = true;

SensorTag.discoverAll(function(sensorTag) {
  sensor = sensorTag.address.toUpperCase()
//  a1 = sensor.substring(0,2)
//  a2 = sensor.substring(2,4)
//  a3 = sensor.substring(4,6)
//  a4 = sensor.substring(6,8)
//  a5 = sensor.substring(8,10)
//  a6 = sensor.substring(10,12)
//  uuid = a1 + ":" + a2 + ":" + a3 + ":" + a4 + ":" + a5 + ":" + a6
  console.log(sensor);
});



//var devices = require(("./private_ids"))
//var asynchronous = true;
//
//if (asynchronous) { 
//    async.forEach(devices, function(deviceMac, callback) {
//      //directly connect to device
//      SensorTag.discoverByAddress(deviceMac, function(err) {
//        console.log("found " + deviceMac); 
//        callback();
//      });  
//    }, function (err) {
//      console.log('All found!');
////      process.exit(0);
//    }); 
//} 
