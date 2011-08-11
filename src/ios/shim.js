/*global PhoneGap, Media*/

// The iOS notification.js implementation doesn't match the normalized PhoneGap javascript.
// This shim does the necessary translation to allow the native code to work with the new javascript.
// The underlying native code should be updated and this shim should be removed.
PhoneGap.shim = function(args) {
    var SERVICE = 2,
    ACTION = 3,
    ARGS = 4, 
    STOP_PROCESSING = -1;
    
    if (args[SERVICE] === "Notification") {

        if (args[ACTION] === "confirm") {
            args[ACTION] = "alert"; // confirm is the same as alert
        }

        if (args[ACTION] === "alert") {
            // translate some of the action arguments into a dictionary
            // [message, _title, _buttonLabel] to [message,{ "title": _title, "buttonLabel": _buttonLabel}]
            args[ARGS] = [args[ARGS][0], {
                "title": args[ARGS][1],
                "buttonLabel": args[ARGS][2]
            }];
        } else if (args[ACTION] === "beep") {            
            (new Media('beep.wav').play());  // no native implementation
            return STOP_PROCESSING;
        }
    }
    return args;
};
