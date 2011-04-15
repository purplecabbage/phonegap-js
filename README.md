PhoneGap JavaScript API
=======================

A single JavaScript implementation that is used by all PhoneGap platforms and a test suite that utilizes [mobile-spec](http://github.com/phonegap/mobile-spec/).

Each PhoneGap platform implements `PhoneGap.exec`, which bridges the communication between the JavaScript API and the native architecture.

Layout
------

    src/ ..................... PhoneGap JavaScript API
    test/ .................... PhoneGap JavaScript API tests
    test/mocks/ .............. Platform native mock objects (for desktop testing)
                               (mocks will be moved soon)
Usage
-----

### 1. Implement PhoneGap.exec

Create `phonegap.js` in your platform's project.

Implement `PhoneGap.exec`:

    /**
     * Execute a PhoneGap command.
     *
     * It is up to the native side whether this action is sync or async.  
     *
     * @param {Function} success    The success callback
     * @param {Function} error      The fail callback
     * @param {String}   service    The name of the service to use (com.phonegap.Geolocation)
     * @param {String}   action     Action to be run in PhoneGap (getCurrentPosition)
     * @param {String[]} [args]     Zero or more arguments to pass to the method
     */
    PhoneGap.exec = function(success, error, server, action, args) {
        // do you magic
    };

### 2. Submodule phonegap-js

Include [phonegap-js](http://github.com/davejohnson/phonegap-js) into your project.

    $ cd phonegap-android
    $ mkdir vendor
    $ git submodule add git://github.com/davejohnson/phonegap-js.git vendor/phonegap-js

### 3. Build phonegap.js

    # Add PhoneGap.exec
    cp phonegap.js vendor/phonegap-js/lib/phonegap.js

    # Build
    cd vendor/phonegap-js
    make build

Test in a browser or PhoneGap app:

    vendor/phonegap-js/test/index.html

FAQ
===

__Q: Why are a bunch of tests commented out in `test/index.html`?__

A: In short, no one has got it working yet. Maybe the the tests are not fully implemented. Maybe the API is still not considered common to all platforms. Maybe no one has got around to implementing it. Contributions are welcome!

__Q: What is the point of the mock object? It's all lies.__

A: Mock objects allow us to test the JavaScript implementation without worrying about the native implementation. It also allows us to specify expected return values for the tests. It would be nice to have __true__ mock objects, where the test case could mock an expected response, but the current approach is a good start. A separate set of tests need to exist on the native side to verify the native responses. If you have an idea on how to unify the two (e.g. a mocking library that can tell the native-side to return a particular mocked value), then we'd love to hear it!
