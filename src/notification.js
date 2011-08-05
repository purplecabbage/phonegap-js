/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

/**
 * This class provides access to notifications on the device.
 * @constructor
 */
PG.notification = {

    /**
     * Open a native alert dialog, with a customizable title and button text.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {Function} completeCallback   The callback that is called when user clicks on a button.
     * @param {String} title                Title of the alert dialog (default: Alert)
     * @param {String} buttonLabel          Label of the close button (default: OK)
     */
    alert: function(message, completeCallback, title, buttonLabel) {
        var _title = (title || "Alert");
        var _buttonLabel = (buttonLabel || "OK");
        PG.exec(completeCallback, null, "Notification", "alert", [message,_title,_buttonLabel]);
    },

    /**
     * Open a native confirm dialog, with a customizable title and button text.
     * The result that the user selects is returned to the result callback.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {Function} resultCallback     The callback that is called when user clicks on a button.
     * @param {String} title                Title of the alert dialog (default: Confirm)
     * @param {String} buttonLabels         Comma separated list of the labels of the buttons (default: 'OK,Cancel')
     */
    confirm: function(message, resultCallback, title, buttonLabels) {
        var _title = (title || "Confirm");
        var _buttonLabels = (buttonLabels || "OK,Cancel");
        PG.exec(resultCallback, null, "Notification", "confirm", [message,_title,_buttonLabels]);
    },

    /**
     * Start spinning the activity indicator on the statusbar
     */
    activityStart: function() {
        PG.exec(null, null, "Notification", "activityStart", ["Busy","Please wait..."]);
    },

    /**
     * Stop spinning the activity indicator on the statusbar, if it's currently spinning
     */
    activityStop: function() {
        PG.exec(null, null, "Notification", "activityStop", []);
    },

    /**
     * Display a progress dialog with progress bar that goes from 0 to 100.
     *
     * @param {String} title        Title of the progress dialog.
     * @param {String} message      Message to display in the dialog.
     */
    progressStart: function(title, message) {
        PG.exec(null, null, "Notification", "progressStart", [title, message]);
    },

    /**
     * Set the progress dialog value.
     *
     * @param {Number} value         0-100
     */
    progressValue: function(value) {
        PG.exec(null, null, "Notification", "progressValue", [value]);
    },

    /**
     * Close the progress dialog.
     */
    progressStop: function() {
        PG.exec(null, null, "Notification", "progressStop", []);
    },

    /**
     * Causes the device to blink a status LED.
     *
     * @param {Integer} count       The number of blinks.
     * @param {String} colour       The colour of the light.
     */
    blink: function(count, colour) {
        // NOT IMPLEMENTED
    },

    /**
     * Causes the device to vibrate.
     *
     * @param {Integer} mills       The number of milliseconds to vibrate for.
     */
    vibrate: function(mills) {
        PG.exec(null, null, "Notification", "vibrate", [mills]);
    },

    /**
     * Causes the device to beep.
     * On Android, the default notification ringtone is played "count" times.
     *
     * @param {Integer} count       The number of beeps.
     */
    beep: function(count) {
        PG.exec(null, null, "Notification", "beep", [count]);
    }
};
