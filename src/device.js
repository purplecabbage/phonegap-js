
/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 * 
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010, IBM Corporation
 */

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device() {
  this.platform = null;
  this.version  = null;
  this.name     = null;
  this.uuid     = null;
  this.phonegap = null;
};

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
Device.prototype.getInfo = function(successCallback, errorCallback) {

    // successCallback required
    if (typeof successCallback !== "function") {
        console.log("Device Error: successCallback is not a function");
        return;
    }

    // errorCallback optional
    if (errorCallback && (typeof errorCallback !== "function")) {
        console.log("Device Error: errorCallback is not a function");
        return;
    }

    // Get info
    PhoneGap.exec(successCallback, errorCallback, "com.phonegap.Device", "getInfo", []);
};

PhoneGap.addConstructor(function() {
  navigator.device = window.device = new Device();

  // Immediately populate the device information
  navigator.device.getInfo(function(info) {
      navigator.device.platform = info.platform;
      navigator.device.version  = info.version;
      navigator.device.name     = info.name;
      navigator.device.uuid     = info.uuid;
      navigator.device.phonegap = info.phonegap;

      PhoneGap.onPhoneGapInfoReady.fire();
  });
});
