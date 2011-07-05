/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

/**
 * This class provides access to device Compass data.
 * @constructor
 */
PG.compass = {
    /**
     * The last known Compass position.
     */
    lastHeading: null,

    /**
     * List of compass watch timers
     */
    timers: {},

    // ERROR_MSG: ["Not running", "Starting", "", "Failed to start"],

    /**
     * Asynchronously aquires the current heading.
     *
     * @param {Function} successCallback The function to call when the heading data is available
     * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
     * @param {PositionOptions} options The options for getting the heading data such as timeout. (OPTIONAL)
     */
    getCurrentHeading: function(successCallback, errorCallback, options) {

        // successCallback required
        if (typeof successCallback !== "function") {
            console.log("Compass Error: successCallback is not a function");
            return;
        }

        // errorCallback optional
        if (errorCallback && (typeof errorCallback !== "function")) {
            console.log("Compass Error: errorCallback is not a function");
            return;
        }

        // Get heading
        PG.exec(successCallback, errorCallback, "Compass", "getHeading", []);
    },

    /**
     * Asynchronously aquires the heading repeatedly at a given interval.
     *
     * @param {Function} successCallback    The function to call each time the heading data is available
     * @param {Function} errorCallback      The function to call when there is an error getting the heading data. (OPTIONAL)
     * @param {HeadingOptions} options      The options for getting the heading data such as timeout and the frequency of the watch. (OPTIONAL)
     * @return String                       The watch id that must be passed to #clearWatch to stop watching.
     */
    watchHeading: function(successCallback, errorCallback, options) {

        // Default interval (100 msec)
        var frequency = (options !== undefined) ? options.frequency : 100;

        // successCallback required
        if (typeof successCallback !== "function") {
            console.log("Compass Error: successCallback is not a function");
            return;
        }

        // errorCallback optional
        if (errorCallback && (typeof errorCallback !== "function")) {
            console.log("Compass Error: errorCallback is not a function");
            return;
        }

        // Make sure compass timeout > frequency + 10 sec
        PG.exec(
            function(timeout) {
                if (timeout < (frequency + 10000)) {
                    PG.exec(null, null, "Compass", "setTimeout", [frequency + 10000]);
                }
            },
            function(e) { }, "Compass", "getTimeout", []);

        // Start watch timer to get headings
        var id = PG.createUUID();
        navigator.compass.timers[id] = setInterval(
            function() {
                PG.exec(successCallback, errorCallback, "Compass", "getHeading", []);
            }, (frequency ? frequency : 1));

        return id;
    },

    /**
     * Clears the specified heading watch.
     *
     * @param {String} id       The ID of the watch returned from #watchHeading.
     */
    clearWatch: function(id) {

        // Stop javascript timer & remove from timer list
        if (id && PG.compass.timers[id]) {
            clearInterval(PG.compass.timers[id]);
            delete PG.compass.timers[id];
        }
    }
};
