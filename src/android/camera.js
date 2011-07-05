/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

PG.Camera = {
    /**
     * Format of image that returned from getPicture.
     *
     * Example: navigator.camera.getPicture(success, fail,
     *              { quality: 80,
     *                destinationType: Camera.DestinationType.DATA_URL,
     *                sourceType: Camera.PictureSourceType.PHOTOLIBRARY})
     */
    DestinationType: {
        DATA_URL: 0,                // Return base64 encoded string
        FILE_URI: 1                 // Return file uri (content://media/external/images/media/2 for Android)
    },

    /**
     * Source to getPicture from.
     *
     * Example: navigator.camera.getPicture(success, fail,
     *              { quality: 80,
     *                destinationType: Camera.DestinationType.DATA_URL,
     *                sourceType: Camera.PictureSourceType.PHOTOLIBRARY})
     */
    PictureSourceType: {
        PHOTOLIBRARY : 0,           // Choose image from picture library (same as SAVEDPHOTOALBUM for Android)
        CAMERA : 1,                 // Take picture from camera
        SAVEDPHOTOALBUM : 2         // Choose image from picture library (same as PHOTOLIBRARY for Android)
    }
}

/**
 * This class provides access to the device camera.
 *
 * @constructor
 */
PG.camera = {
    successCallback: null,
    errorCallback: null,
    options: null,

    /**
     * Gets a picture from source defined by "options.sourceType", and returns the
     * image as defined by the "options.destinationType" option.

     * The defaults are sourceType=CAMERA and destinationType=DATA_URL.
     *
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @param {Object} options
     */
    getPicture: function(successCallback, errorCallback, options) {

        // successCallback required
        if (typeof successCallback !== "function") {
            console.log("Camera Error: successCallback is not a function");
            return;
        }

        // errorCallback optional
        if (errorCallback && (typeof errorCallback !== "function")) {
            console.log("Camera Error: errorCallback is not a function");
            return;
        }

        this.options = options;
        var quality = 80;
        if (options.quality) {
            quality = this.options.quality;
        }
        var destinationType = PG.Camera.DestinationType.DATA_URL;
        if (this.options.destinationType) {
            destinationType = this.options.destinationType;
        }
        var sourceType = PG.Camera.PictureSourceType.CAMERA;
        if (typeof this.options.sourceType === "number") {
            sourceType = this.options.sourceType;
        }
        PG.exec(successCallback, errorCallback, "Camera", "takePicture", [quality, destinationType, sourceType]);
    }
};
