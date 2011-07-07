/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
PG.device = {
    available: PG.available,
    platform: null,
    version: null,
    name: null,
    uuid: null,
    phonegap: null,

    /**
     * Get device info
     *
     * @param {Function} successCallback The function to call when the heading data is available
     * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
     */
    getInfo: function(successCallback, errorCallback) {

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
        PG.exec(successCallback, errorCallback, "Device", "getDeviceInfo", []);
    }
};

PG.device.getInfo(PG.bind(PG.device, function(info) {
        this.available = true;
        this.platform = info.platform;
        this.version = info.version;
        this.name = info.name;
        this.uuid = info.uuid;
        this.phonegap = info.phonegap;
        PG.onPhoneGapInfoReady.fire();
    }), PG.bind(PG.device, function(e) {
        this.available = false;
        console.log("Error initializing PhoneGap: " + e);
        alert("Error initializing PhoneGap: "+e);
    })
);