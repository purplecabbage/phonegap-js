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
    exec: function(clazz, action, callbackId, args) {
        switch(clazz.toLowerCase()) {
            case 'com.phonegap.notification':
                return PhoneGap.commandManager.callNotification(action, callbackId, args);
                break;
            case 'com.phonegap.network':
                return PhoneGap.commandManager.callNetwork(action, callbackId, args);
                break;
        }
        
        return false;
    },
    
    callNetwork: function(action, callbackId, args) {
        switch(action) {
            case 'isReachable':
                PhoneGap.callbackSuccess(callbackId, { 'code': NetworkStatus.REACHABLE_VIA_WIFI_NETWORK });
                return true;
                break;
        }
        
        return false;
    },
    
    callNotification: function(action, callbackId, args) {
        args = JSON.parse(args);
        switch(action.toLowerCase()) {
            case 'vibrate':
                console.log('Vvvvibrate...');
                return true;
                break;
            case 'beep':
                console.log('BEEP!');
                return true;
                break;
            case 'blink':
                console.log('LED blinks');
                return true;
                break;
            case 'alert':
                alert(args[0]);
                return true;
                break;
        }
        
        return false;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    PhoneGap.onNativeReady.fire();
}, false);