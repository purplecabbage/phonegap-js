// Mock the native CommandManger object

CommandManager = {
    klasses: {
        'com.phonegap.Accelerometer': {
            getCurrentAcceleration: function(callbackId, jsonArgsString) {
    	        PhoneGap.callbackSuccess(callbackId, { x:23 });
    	        return true;
            }
        },
        'com.phonegap.Camera': {
            getPicture: function(callbackId, jsonArgsString) {
                PhoneGap.callbackSuccess(callbackId, { path: 'foo' });
    	        return true;
            }
        },
        'com.phonegap.Geolocation': {
            clearWatch: function(callbackId, jsonArgsString) {
                return 0;
            },
            getCurrentPosition: function(callbackId, jsonArgsString) {
                PhoneGap.callbackSuccess(callbackId, { lat:23 });
    	        return true;
            },
            watchPosition: function(callbackId, jsonArgsString) {
                setTimeout(function() {
                    PhoneGap.callbackWatchSuccess(callbackId, { lat:23 });
                }, 100);
                return 0;
            }
        },
        'com.phonegap.Network': {
            isReachable: function(callbackId, jsonArgsString) {
                PhoneGap.callbackSuccess(callbackId, {code:NetworkStatus.REACHABLE_VIA_WIFI_NETWORK});
    	        return true;
            }
        },
        'com.phonegap.Notification': {
            alert:   function() { return true; },
            beep:    function() { return true; },
            blink:   function() { return true; },
            vibrate: function() { return true; }
        }
    },
    exec: function(clazz, action, callbackId, jsonArgsString) {
        try {
            console.log(clazz + '.' + action);
            return CommandManager.klasses[clazz][action](callbackId, jsonArgsString);
        }
        catch(e) {
            return -1;
        }
    },
    execWatch: function(clazz, action, callbackId, jsonArgsString) {
        try {
            return CommandManager.klasses[clazz][action](callbackId, jsonArgsString);
        }
        catch(e) {
            return -1;
        }
    }
};

// Fake the onNativeReady event by firing when the DOM content has loaded

document.addEventListener('DOMContentLoaded', function() {
    PhoneGap.onNativeReady.fire();
}, false);