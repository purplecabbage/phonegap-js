Put phonegap.js Here
=====================

`phonegap.js` implements the JavaScript-to-Native bridge `PhoneGap.exec`. This bridge is different for each PhoneGap platform.

Interface
---------

    /**
     * Execute a PhoneGap command.
     *
     * @param {Function} success Success callback, which is different for each command.
     * @param {Function} error   Failure callback, which is different for each command.
     * @param {String}   service Native service to reference (e.g. com.phonegap.Geolocation).
     * @param {String}   action  Native action to execute (e.g. getCurrentPosition).
     * @param {String[]} [args]  Zero or more arguments to pass into the action.
     */
    PhoneGap.exec = function(success, error, service, action, args) {
        // do your magic
    };

Notes
-----

- camelCase service and action

- Combine service and action
    - rename to uri?
    - com.phonegap.geolocation.getCurrentPosition

