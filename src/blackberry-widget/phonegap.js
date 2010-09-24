var PhoneGap = {
    EXECUTE_SYNC: 0,
    EXECUTE_ASYNC: 1,
    
    desktop: false,
    watchId: 0,
    callbackId: 0,
    callbacks: {},
    callbacksWatch: {},
    
    exec: function(success, fail, clazz, action, args) {
        clazz = PhoneGap.lookupClass(clazz);
        
        var callbackId = clazz + PhoneGap.callbackId++;
        PhoneGap.callbacks[callbackId] = { success:success, fail:fail };
        
        return PhoneGap.commandManager.exec(clazz, action, callbackId, JSON.stringify(args), PhoneGap.EXECUTE_ASYNC);
    },
    
    execSync: function(clazz, action, args) {
        clazz = PhoneGap.lookupClass(clazz);
        return PhoneGap.commandManager.exec(clazz, action, null, JSON.stringify(args), PhoneGap.EXECUTE_SYNC);
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
    },
    
    lookupClass: function(clazz) {
        switch(clazz.toLowerCase()) {
            case 'com.phonegap.accelerometer':
                clazz = 'com.phonegap.accelerometer.Accelerometer';
                break;
            case 'com.phonegap.camera':
                clazz = 'com.phonegap.camera.Camera';
                break;
            case 'com.phonegap.geolocation':
                clazz = 'com.phonegap.geolocation.Geolocation';
                break;
            case 'com.phonegap.notification':
                clazz = 'com.phonegap.notification.Notification';
                break;
            case 'com.phonegap.network':
                clazz = 'com.phonegap.network.Network';
                break;
            case 'com.phonegap.notification':
                clazz = 'com.phonegap.notification.Notification';
                break;
            default:
                break;
        }
        
        return clazz;
    }
    
};

// @TODO This is a hacky workaround so that the tests past.
//       PhoneGapJS needs to reconsider how synchronous
//       members are binded.
//
setTimeout(function() {
    document.addEventListener('deviceready', function() {
        Device.name     = blackberry.system.model;
        Device.platform = phonegapWidget.device.platform;
        Device.uuid     = phonegapWidget.device.uuid;
        Device.version  = blackberry.system.softwareVersion;
    }, false);
    
}, 10);