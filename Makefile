.SILENT: help test android blackberry-webworks build check update clean

VERSION = $(strip $(shell cat VERSION))

PHONEGAP_JS_FILE     = phonegap.${VERSION}.js
PHONEGAP_JS_MIN_FILE = phonegap.${VERSION}.min.js

BUILD_DIR       = build
PHONEGAP_JS     = ${BUILD_DIR}/${PHONEGAP_JS_FILE}
PHONEGAP_JS_MIN = ${BUILD_DIR}/${PHONEGAP_JS_MIN_FILE}

PHONEGAP_EXEC_JS     = lib/phonegap/phonegap.exec.js
PHONEGAP_OVERRIDE_JS = lib/phonegap/phonegap.override.js

FILES = src/phonegap.core.js \
        ${PHONEGAP_EXEC_JS} \
        src/accelerometer.js \
        src/camera.js \
        src/contact.js \
        src/device.js \
        src/file.js \
        src/geolocation.js \
        src/network.js \
        src/notification.js \
        src/position.js \
        ${PHONEGAP_OVERRIDE_JS}

ANDROID_FILES = src/android/phonegap.js \
                src/android/accelerometer.js \
                src/android/app.js \
                src/android/camera.js \
                src/android/capture.js \
                src/android/compass.js \
                src/android/contact.js \
                src/android/crypto.js \
                src/android/device.js \
                src/android/file.js \
                src/android/filetransfer.js \
                src/android/geolocation.js \
                src/android/media.js \
                src/android/network.js \
                src/android/media.js \
                src/android/network.js \
                src/android/notification.js \
                src/android/position.js \
                src/android/storage.js

BLACKBERRY_WEBWORKS_FILES = src/blackberry-webworks/*.js

help:
	echo
	echo "NAME"
	echo "  Build phonegap.x.x.x.js and phonegap.x.x.x.min.js"
	echo
	echo "DESCRIPTION"
	echo "  Build phonegap.x.x.x.js for a given platform implementation."
	echo
	echo "SYNOPSIS"
	echo "  make COMMAND"
	echo
	echo "COMMANDS"
	echo "  help .................. This help menu."
	echo "  test .................. Generate test suite web directory."
	echo "  android ............... Generate phonegap.js for Android."
	echo "  blackberry-webworks ... Generate phonegap.js for BlackBerry WebWorks."
	echo "  build ................. Generate phonegap.js (Incomplete)."
	echo "  check ................. Dependency check."
	echo "  update ................ Update submodules."
	echo

test: check
	echo "Updating test suite..."
	
	if [ ! -e ${PHONEGAP_JS} ]; then echo " => Error: Cannot find ${PHONEGAP_JS}"; exit 1; fi
	if [ ! -e ${PHONEGAP_JS_MIN} ]; then echo " => Error: Cannot find ${PHONEGAP_JS_MIN}"; exit 1; fi
	
	cp ${BUILD_DIR}/*.js test/
	mv test/${PHONEGAP_JS_FILE} test/phonegap.js
	mv test/${PHONEGAP_JS_MIN_FILE} test/phonegap.min.js
	
	echo "  => Done!"
	echo "How to Install:"
	echo "  => cp test/* /path/to/project/www"

android: clean update
	echo "Build phonegap.${VERSION}.js for Android..."
	mkdir -p ${BUILD_DIR}
	echo "  => ${PHONEGAP_JS}"
	cat ${ANDROID_FILES} > ${PHONEGAP_JS}
	echo "  => ${PHONEGAP_JS_MIN}"
	java -jar ./lib/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar ${PHONEGAP_JS} -o ${PHONEGAP_JS_MIN}

blackberry-webworks: clean update
	echo "Build phonegap.${VERSION}.js for BlackBerry WebWorks..."
	mkdir -p ${BUILD_DIR}
	echo "  => ${PHONEGAP_JS}"
	cat ${BLACKBERRY_WEBWORKS_FILES} > ${PHONEGAP_JS}
	echo "  => ${PHONEGAP_JS_MIN}"
	java -jar ./lib/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar ${PHONEGAP_JS} -o ${PHONEGAP_JS_MIN}

build: clean check update
	echo "Building..."
	mkdir -p ${BUILD_DIR}
	echo "  => ${PHONEGAP_JS}"
	cat ${FILES} > ${PHONEGAP_JS}
	echo "  => ${PHONEGAP_JS_MIN}"
	java -jar ./lib/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar ${PHONEGAP_JS} -o ${PHONEGAP_JS_MIN}

check:
	echo "Checking dependencies..."
	if [ ! -e ${PHONEGAP_EXEC_JS} ]; then echo " => Error: Cannot find ${PHONEGAP_EXEC_JS}"; exit 1; fi
	if [ ! -e ${PHONEGAP_OVERRIDE_JS} ]; then touch ${PHONEGAP_OVERRIDE_JS}; fi

update:
	echo "Updating submodules..."
	git submodule update --init

clean:
	if test -d ${BUILD_DIR}; then \
		rm -rf ${BUILD_DIR}; \
	fi
