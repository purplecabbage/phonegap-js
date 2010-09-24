// Mock the native CommandManger object

PhoneGap.commandManager = {
    klasses: {
        'com.phonegap.accelerometer.Accelerometer': {
            getCurrentAcceleration: function(callbackId, jsonArgsString) {
                PhoneGap.callbackSuccess(callbackId, { x:23 });
                return true;
            }
        },
        'com.phonegap.camera.Camera': {
            getPicture: function(callbackId, jsonArgsString) {
                PhoneGap.callbackSuccess(callbackId, { path: 'foo' });
                return true;
            }
        },
        'com.phonegap.geolocation.Geolocation': {
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
        'com.phonegap.network.Network': {
            isReachable: function(callbackId, jsonArgsString) {
                PhoneGap.callbackSuccess(callbackId, { 'code': NetworkStatus.REACHABLE_VIA_WIFI_NETWORK });
                return true;
            }
        },
        'com.phonegap.notification.Notification': {
            alert:   function(callbackId, jsonArgsString) {
                jsonArgsString = JSON.parse(jsonArgsString);
                alert(args[0]);
                return true;
            },
            beep:    function() {
                console.log('BEEP!');
                return true;
            },
            blink:   function() {
                console.log('LED blinks');
                return true;
            },
            vibrate: function() {
                console.log('Vvvvibrate...');
                return true;
            }
        }
    },
    exec: function(clazz, action, callbackId, jsonArgsString) {
        try {
            return this.klasses[clazz][action](callbackId, jsonArgsString);
        }
        catch(e) {
            console.log('Exception fired');
            return -1;
        }
    },
    execWatch: function(clazz, action, callbackId, jsonArgsString) {
        try {
            return this.klasses[clazz][action](callbackId, jsonArgsString);
        }
        catch(e) {
            return -1;
        }
    }
};

// Mock the JavaScript bindings

var phonegapWidget = {
    device: {
        platform: 'os 5.0',
        uuid:     '0001000100'
    }
};

// Mock BlackBerry System API

var blackberry = {
    system: {
        model:           'storm',
        softwareVersion: '5.0'
    }
};

// Fake the onNativeReady event by firing when the DOM content has loaded

document.addEventListener('DOMContentLoaded', function() {
    PhoneGap.onNativeReady.fire();
}, false);
