PhoneGap JavaScript API
=======================

> One JavaScript to rule them all.

This JavaScript implementation is intended to be used by all PhoneGap platforms.

A platform implements `PhoneGap.exec` in `lib/phonegap/phonegap.exec.js`.
This is the magical, platform-specific JavaScript function that bridges
the messages between the browser and native architecture.

1) Installing phonegap-js to a PhoneGap Platform
------------------------------------------------

The recommended approach is to use a [Git Submodule](http://progit.org/book/ch6-6.html)
called `lib/phonegap-js`.

    $ cd phonegap-platform
    $ mkdir lib
    $ git submodule add git://github.com/davejohnson/phonegap-js.git lib/phonegap-js

2) Implementing PhoneGap.exec
-----------------------------

Although all PhoneGap platforms use the same JavaScript source, each platform must
define how to communicate with the native architecture.

This is where `PhoneGap.exec` steps in.

To learn how to implement `PhoneGap.exec`, please read [lib/phonegap/README.md](phonegap-js/blob/master/lib/phonegap/README.md).

3) Defining Extra JavaScript Functionality
------------------------------------------

Ideally, a platform should not need to define extra functionality.

However, until phonegap-js is battle tested, this is where can declare
all of your nasty, proprietary JavaScript.

To learn how to implement extra functionality, please read [lib/phonegap/phonegap.extras.md](phonegap-js/blob/master/lib/phonegap/phonegap.extras.md).

4) Building phonegap.x.x.x.js for your PhoneGap Platform
--------------------------------------------------------

Once you have implemented `PhoneGap.exec`, you can generate `build/phonegap.x.x.x.js`
and `build/phonegap.x.x.x.min.js`.

    $ make build

4) Testing phonegap.js for a PhoneGap Platform
----------------------------------------------

Point your PhoneGap application to `test/index.html`

@TODO This needs to be streamlined better. Perhaps `make` can copy the generated `phonegap.js` to the tests directory.

FAQ
===

__Q: Why are a bunch of tests commented out in `test/index.html`?__

A: In short, no one has got it working yet. Maybe the the tests are not fully implemented. Maybe the API is still not considered common to all platforms. Maybe no one has got around to implementing it. Contributions are welcome!
