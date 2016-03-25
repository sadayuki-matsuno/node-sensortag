var util = require('util');

var async = require('async');

var SensorTag = require('sensortag');;

var USE_READ = true;

SensorTag.discoverAll(function(sensorTag) {
  console.log('discovered: ' + sensorTag);

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
