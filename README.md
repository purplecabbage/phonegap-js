PhoneGap JavaScript API
=======================

This is the PhoneGap JavaScript API. A platform must implement a mediator that coordinates the communication between the JavaScript API and the native implementation.

Directory Layout
----------------

    src/ ..................... PhoneGap JavaScript API
    src/android/ ............. Implements PhoneGap-Android
    src/blackberry-widget/ ... Implements PhoneGap-BlackBerry-Widget
    src/desktop/ ............. Implements PhoneGap-Desktop
    test/ .................... PhoneGap JavaScript API tests
    test/mocks/ .............. Platform native mock objects (for desktop testing)

Running the Tests
-----------------

1. Edit `test/index.html` to use the platform that you want to test.
        
        <!-- Choose Platform to Test -->
    	<script type="text/javascript" src="../src/blackberry-widget/phonegap.js"></script>
    	<script type="text/javascript" src="mocks/blackberry-widget.mocks.js"></script>
2. Open `test/index.html` in a desktop browser.
3. Make sure that a test summary is listed at the bottom. If it is not listed, then an asynchronous test may be hanging.
        
        Tests completed in 194 milliseconds.
        89 tests of 97 passed, 8 failed.

FAQ
===

__Q: Why are a bunch of tests commented out in `test/index.html`?__

A: In short, no one has got it working yet. Maybe the the tests are not fully implemented. Maybe the API is still not considered common to all platforms. Maybe no one has got around to implementing it. Contributions are welcome!

__Q: What is the point of the mock object? It's all lies.__

A: Mock objects allow us to test the JavaScript implementation without worrying about the native implementation. It also allows us to specify expected return values for the tests. It would be nice to have __true__ mock objects, where the test case could mock an expected response, but the current approach is a good start. A separate set of tests need to exist on the native side to verify the native responses. If you have an idea on how to unify the two (e.g. a mocking library that can tell the native-side to return a particular mocked value), then we'd love to hear it!

TODO
====

- Get execWatch working.
- A script that builds phonegap.js for each platform. The concatenation order is important.