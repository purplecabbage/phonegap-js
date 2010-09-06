Tests.prototype.NotificationTests = function() {	
	module('Notification (navigator.notification)');
	test("should exist", function() {
  		expect(1);
  		ok(phonegap.notification != null, "phonegap.notification should not be null.");
	});
	test("should contain a vibrate function", function() {
		expect(2);
		
		ok(typeof phonegap.notification.vibrate === 'function', "phonegap.notification.vibrate should be a function.");

		ok(phonegap.notification.vibrate(1000), "phonegap.notification.vibrate should be sent to native.");
	});
	test("should contain a beep function", function() {
		expect(2);

		ok(typeof phonegap.notification.beep == 'function', "phonegap.notification.beep should be a function.");

		ok(phonegap.notification.beep(100, 3), "phonegap.notification.beep should be sent to native.");
	});
	test("should contain a blink function", function() {
		expect(2);

		ok(typeof phonegap.notification.blink == 'function', "phonegap.notification.blink should be a function.");
		
		ok(phonegap.notification.blink(1000, 'red'), "phonegap.notification.blink should be sent to native.");;
	});
	test("should contain an alert function", function() {
		expect(2);
		
		ok(typeof phonegap.notification.alert == 'function', "phonegap.notification.alert should be a function.");
        
        var onSuccess = function() {};
        var onFail    = function() {};
		ok(phonegap.notification.alert(onSuccess, onFail, 'message', 'title', 'button label'),
		    "phonegap.notification.alert should be sent to native.");
	});
};