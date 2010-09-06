/**
 * this represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
var Device = {
    'available': false,
    'platform':  null,
    'version':   null,
    'name':      null,
    'gap':       null,
    'uuid':      null,
    
    overrideBackButton: function() { BackButton.override(); },
    resetBackButton:    function() { BackButton.reset(); },
    exitApp:            function() { BackButton.exitApp(); }
};

PhoneGap.addConstructor(function() { PhoneGap.addExtension('device', Device); });