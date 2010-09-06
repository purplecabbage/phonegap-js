var PhoneGap = {
    desktop: false,
    watchId: 0,
    callbackId: 0,
    callbacks: {},
    callbacksWatch: {},
    
    exec: function(success, fail, clazz, action, args) {
        var callbackId = clazz + PhoneGap.callbackId++;
        
        PhoneGap.callbacks[callbackId] = { success:success, fail:fail };
        
        return PhoneGap.commandManager.exec(clazz, action, callbackId, JSON.stringify(args));
    },
    
    execSync: function(clazz, action, args) {
        return PhoneGap.commandManager.exec(clazz, action, null, JSON.stringify(args));
    },
    
    callbackSuccess: function(callbackId, args) {
        PhoneGap.callbacks[callbackId].success(args);
        PhoneGap.clearExec(callbackId);
    },
    
    callbackError: function(callbackId, args) {
        PhoneGap.callbacks[callbackId].fail(args);
        PhoneGap.clearExec(callbackId);
    },
    
    clearExec: function(callbackId) {
        delete PhoneGap.callbacks[callbackId];
    },
    
    execWatch: function(success, fail, clazz, action, args) {
        var watchId = PhoneGap.watchId++;
        
        PhoneGap.callbacksWatch[watchId] = { success:success, fail:fail };
        
        var error = PhoneGap.commandManager.execWatch(clazz, action, watchId, JSON.stringify(args));
        
        if (error !== '0') { throw error; }
        
        return watchId;
    },
    
    clearWatch: function(clazz, watchId) {
        delete PhoneGap.callbacksWatch[watchId];
        
        var error = PhoneGap.commandManager.exec(clazz, 'clearWatch', null, JSON.stringify( { watchId: watchId } ) );
        
        if (error != '0') { throw error; }
    },
    
    callbackWatchSuccess: function(watchId, args) {
        PhoneGap.callbacksWatch[watchId].success(args);
    }
};

PhoneGap.commandManager = {
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
                PhoneGap.callbackSuccess(callbackId, { 'code': NetworkStatus.REACHABLE_VIA_WIFI_NETWORK });
                return true;
            }
        },
        'com.phonegap.Notification': {
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

document.addEventListener('DOMContentLoaded', function() {
    Device.available = true;
    Device.platform  = 'desktop';
    Device.version   = '1.0';
    Device.name      = navigator.userAgent;
    Device.gap       = '0.9.1';
    Device.uuid      = '01010101010101';
    
    PhoneGap.onNativeReady.fire();
}, false);