PhoneGap JavaScript API
=======================

> One JavaScript to rule them all.

This is the JavaScript implementation that is used by all PhoneGap platforms.

Each platform implements `PhoneGap.exec` in `lib/phonegap/phonegap.js`. This is the magical, platform-specific JavaScript that bridges the messages between the browser and the native architecture.

1) Installing phonegap-js to a PhoneGap Platform
------------------------------------------------

The recommended approach is to use a [Git Submodule](http://progit.org/book/ch6-6.html).

    $ cd phonegap-newplatform
    $ mkdir lib
    $ git submodule add git://github.com/davejohnson/phonegap-js.git lib/phonegap-js

2) Implementing PhoneGap.exec for a PhoneGap Platform
-----------------------------------------------------

All PhoneGap platforms use the same JavaScript source, but each platform must define how to communicate with the native architecture. This is where `PhoneGap.exec` steps in. Each PhoneGap platform must define its own `PhoneGap.exec` in order to generate `phonegap.js`.

The article [lib/phonegap/README.md](lib/phonegap/README.md) explains how to implement `PhoneGap.exec`.

3) Building phonegap.js for a PhoneGap Platform
-----------------------------------------------

Once you have implemented `PhoneGap.exec`, you can generate `build/phonegap.js` and its minified counterpart.

    $ make build

4) Testing phonegap.js for a PhoneGap Platform
----------------------------------------------

Point your PhoneGap application to `test/index.html`

@TODO This needs to be streamlined better. Perhaps `make` can copy the generated `phonegap.js` to the tests directory.

FAQ
===

__Q: Why are a bunch of tests commented out in `test/index.html`?__

A: In short, no one has got it working yet. Maybe the the tests are not fully implemented. Maybe the API is still not considered common to all platforms. Maybe no one has got around to implementing it. Contributions are welcome!
