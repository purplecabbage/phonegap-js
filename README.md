PhoneGap JavaScript API
=======================

A single JavaScript implementation for all PhoneGap platforms and a test suite that utilizes [mobile-spec](http://github.com/phonegap/mobile-spec/).

Each PhoneGap platforms implements a mediator that bridges the communication between the JavaScript API and the native architecture.

Layout
------

    src/ ..................... PhoneGap JavaScript API
    test/ .................... PhoneGap JavaScript API tests
    test/mocks/ .............. Platform native mock objects (for desktop testing)
                               (mocks will be moved soon)
Usage
-----

### Implement the mediator

Create `phonegap.js` wherever it makes sense.

Instructions assume the path `src/javascript/phonegap.js`

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

### Include this repository

Include [phonegap-js](http://github.com/davejohnson/phonegap-js) into your project.

Instructions assume the path `vendor/phonegap-js`.

There are many ways to include this repository:

- use a submodule
- use a build script + .gitignore
    - see phonegap-js/makefile for an example
- committing the source to your repository _(not recommended)_

### Build and test

Build:

    # Add PhoneGap.exec
    cp src/javascript/phonegap.js vendor/phonegap-js/src/phonegap.js

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