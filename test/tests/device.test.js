Tests.prototype.DeviceTests = function() {
    module('Device Information (phonegap.device)');
    test("should exist", function() {
        expect(1);
        ok(phonegap.device != null, "phonegap.device should not be null.");
    });
    test("should contain a platform specification that is a string", function() {
        expect(2);
        ok(typeof phonegap.device.platform != 'undefined' && phonegap.device.platform != null, "phonegap.device.platform should not be null.");
        ok((new String(phonegap.device.platform)).length > 0, "phonegap.device.platform should contain some sort of description.");
    });
    test("should contain a version specification that is a string", function() {
        expect(2);
        ok(typeof phonegap.device.version != 'undefined' && phonegap.device.version != null, "phonegap.device.version should not be null.");
        ok((new String(phonegap.device.version)).length > 0, "phonegap.device.version should contain some kind of description.");
    });
    test("should contain a name specification that is a string", function() {
        expect(2);
        ok(typeof phonegap.device.name != 'undefined' && phonegap.device.name != null, "phonegap.device.name should not be null.");
        ok((new String(phonegap.device.name)).length > 0, "phonegap.device.name should contain some kind of description.");
    });
    test("should contain a UUID specification that is a string or a number", function() {
        expect(2);
        ok(typeof phonegap.device.uuid != 'undefined' && phonegap.device.uuid != null, "phonegap.device.uuid should not be null.");
        if (typeof phonegap.device.uuid == 'string' || typeof phonegap.device.uuid == 'object') {
            ok((new String(phonegap.device.uuid)).length > 0, "phonegap.device.uuid, as a string, should have at least one character.");
        } else {
            ok(phonegap.device.uuid > 0, "phonegap.device.uuid, as a number, should be greater than 0. (should it, even?)");
        }
    });
    test('should be tested', function() {
       expect(1); 
    });
};