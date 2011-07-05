/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

// TODO: Will MediaError be used?
/**
 * This class contains information about any Media errors.
 * @constructor
 */
PG.MediaError = {
    code: null,
    message: "",
    MEDIA_ERR_ABORTED                   : 1,
    MediaError.MEDIA_ERR_NETWORK        : 2,
    MediaError.MEDIA_ERR_DECODE         : 3,
    MediaError.MEDIA_ERR_NONE_SUPPORTED : 4
};

/**
 * This class provides access to the device media, interfaces to both sound and video
 *
 * @constructor
 * @param src                   The file name or url to play
 * @param successCallback       The callback to be called when the file is done playing or recording.
 *                                  successCallback() - OPTIONAL
 * @param errorCallback         The callback to be called if there is an error.
 *                                  errorCallback(int errorCode) - OPTIONAL
 * @param statusCallback        The callback to be called when media status has changed.
 *                                  statusCallback(int statusCode) - OPTIONAL
 * @param positionCallback      The callback to be called when media position has changed.
 *                                  positionCallback(long position) - OPTIONAL
 */
PG.Media = function(src, successCallback, errorCallback, statusCallback, positionCallback) {

    // successCallback optional
    if (successCallback && (typeof successCallback !== "function")) {
        console.log("Media Error: successCallback is not a function");
        return;
    }

    // errorCallback optional
    if (errorCallback && (typeof errorCallback !== "function")) {
        console.log("Media Error: errorCallback is not a function");
        return;
    }

    // statusCallback optional
    if (statusCallback && (typeof statusCallback !== "function")) {
        console.log("Media Error: statusCallback is not a function");
        return;
    }

    // statusCallback optional
    if (positionCallback && (typeof positionCallback !== "function")) {
        console.log("Media Error: positionCallback is not a function");
        return;
    }

    this.id = PG.createUUID();
    PG.mediaObjects[this.id] = this;
    this.src = src;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.statusCallback = statusCallback;
    this.positionCallback = positionCallback;
    this._duration = -1;
    this._position = -1;
};

// Media messages
PG.Media.MEDIA_STATE = 1;
PG.Media.MEDIA_DURATION = 2;
PG.Media.MEDIA_ERROR = 9;

// Media states
PG.Media.MEDIA_NONE = 0;
PG.Media.MEDIA_STARTING = 1;
PG.Media.MEDIA_RUNNING = 2;
PG.Media.MEDIA_PAUSED = 3;
PG.Media.MEDIA_STOPPED = 4;
PG.Media.MEDIA_MSG = ["None", "Starting", "Running", "Paused", "Stopped"];

/**
 * Start or resume playing audio file.
 */
PG.Media.prototype = {
    play: function() {
        PG.exec(null, null, "Media", "startPlayingAudio", [this.id, this.src]);
    },

    /**
     * Stop playing audio file.
     */
    stop: function() {
        return PG.exec(null, null, "Media", "stopPlayingAudio", [this.id]);
    },

    /**
     * Seek or jump to a new time in the track..
     */
    seekTo: function(milliseconds) {
        PG.exec(null, null, "Media", "seekToAudio", [this.id, milliseconds]);
    },

    /**
     * Pause playing audio file.
     */
    pause: function() {
        PG.exec(null, null, "Media", "pausePlayingAudio", [this.id]);
    },

    /**
     * Get duration of an audio file.
     * The duration is only set for audio that is playing, paused or stopped.
     *
     * @return      duration or -1 if not known.
     */
    getDuration: function() {
        return this._duration;
    },

    /**
     * Get position of audio.
     */
    getCurrentPosition: function(success, fail) {
        PG.exec(success, fail, "Media", "getCurrentPositionAudio", [this.id]);
    },

    /**
     * Start recording audio file.
     */
    startRecord: function() {
        PG.exec(null, null, "Media", "startRecordingAudio", [this.id, this.src]);
    },

    /**
     * Stop recording audio file.
     */
    stopRecord: function() {
        PG.exec(null, null, "Media", "stopRecordingAudio", [this.id]);
    },

    /**
     * Release the resources.
     */
    release: function() {
        PG.exec(null, null, "Media", "release", [this.id]);
    }
};

/**
 * List of media objects.
 * PRIVATE
 */
PG.mediaObjects = {};

/**
 * Object that receives native callbacks.
 * PRIVATE
 * @constructor
 */
PG.Media = function() {};

/**
 * Get the media object.
 * PRIVATE
 *
 * @param id            The media object id (string)
 */
PG.Media.getMediaObject = function(id) {
    return PG.mediaObjects[id];
};

/**
 * Audio has status update.
 * PRIVATE
 *
 * @param id            The media object id (string)
 * @param status        The status code (int)
 * @param msg           The status message (string)
 */
PG.Media.onStatus = function(id, msg, value) {
    var media = PG.mediaObjects[id];

    // If state update
    if (msg === Media.MEDIA_STATE) {
        if (value === Media.MEDIA_STOPPED) {
            media.successCallback();
        }
        media.statusCallback(value);
    }
    else if (msg === Media.MEDIA_DURATION) {
        media._duration = value;
    }
    else if (msg === Media.MEDIA_ERROR) {
        media.errorCallback(value);
    }
};