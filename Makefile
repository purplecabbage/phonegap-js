.SILENT: help test android blackberry-webworks build check clean

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

BASE_FILES = src/accelerometer.js \
             src/camera.js \
             src/contact.js \
             src/device.js \
             src/file.js \
             src/geolocation.js \
             src/media.js \
             src/network.js \
             src/notification.js \
             src/phonegap.core.js \
             src/position.js

ANDROID_PHONEGAP_EXEC = src/android/phonegap.js
ANDROID_FILES = src/android/accelerometer.js \
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
                src/android/notification.js \
                src/android/position.js \
                src/android/storage.js

BLACKBERRY_WEBWORKS_PHONEGAP_EXEC = src/blackberry-webworks/_phonegap.js
BLACKBERRY_WEBWORKS_FILES = src/blackberry-webworks/accelerometer.js \
                            src/blackberry-webworks/camera.js \
                            src/blackberry-webworks/console.js \
                            src/blackberry-webworks/contact.js \
                            src/blackberry-webworks/device.js \
                            src/blackberry-webworks/file.js \
                            src/blackberry-webworks/filetransfer.js \
                            src/blackberry-webworks/geolocation.js \
                            src/blackberry-webworks/media.js \
                            src/blackberry-webworks/network.js \
                            src/blackberry-webworks/notification.js \
                            src/blackberry-webworks/position.js 

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
	echo "  test .................. Update test suite with the last generated phonegap.js."
	echo "  android ............... Generate phonegap.js for Android."
	echo "  blackberry-webworks ... Generate phonegap.js for BlackBerry WebWorks."
	echo "  build ................. Generate phonegap.js (Incomplete)."
	echo "  check ................. Dependency check for build task."
	echo
	echo "USAGE"
	echo "  make help"
	echo "  make android"
	echo "  make android test"

test: check
	echo "Updating test suite..."
	
	if [ ! -e ${PHONEGAP_JS} ]; then echo " => Error: Cannot find ${PHONEGAP_JS}"; exit 1; fi
	if [ ! -e ${PHONEGAP_JS_MIN} ]; then echo " => Error: Cannot find ${PHONEGAP_JS_MIN}"; exit 1; fi
	
	cp ${BUILD_DIR}/*.js test/
	mv test/${PHONEGAP_JS_FILE} test/phonegap.js
	mv test/${PHONEGAP_JS_MIN_FILE} test/phonegap.min.js
	
	echo "Test Suite Usage:"
	echo "  => cp -R test/* /path/to/project/www"

android: clean
	echo "Build phonegap.${VERSION}.js for Android..."
	$(call build_javascript, ${ANDROID_PHONEGAP_EXEC}, ${ANDROID_FILES})

blackberry-webworks: clean
	echo "Build phonegap.${VERSION}.js for BlackBerry WebWorks..."
	$(call build_javascript, ${BLACKBERRY_WEBWORKS_PHONEGAP_EXEC}, ${BLACKBERRY_WEBWORKS_FILES})

build: clean check
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

clean:
	if test -d ${BUILD_DIR}; then \
		rm -rf ${BUILD_DIR}; \
	fi

define build_javascript
	# create the build directory
	mkdir -p ${BUILD_DIR}
	echo "  => ${PHONEGAP_JS}"
	# add phonegap.exec.js to the top of phonegap.js
	cat ${1} > ${PHONEGAP_JS}
	echo "    ✔ ${1} was added"; \
	# add all universal JavaScript files
	find ./src/*.js | xargs -J % cat % >> ${PHONEGAP_JS}
	# add each platform-specific file that is not implement as a universal file
	for file in ${2}; do \
		if [ ! -e src/`basename $$file` ]; then \
			cat $$file >> ${PHONEGAP_JS}; \
			echo "    ✔ $$file was added"; \
		else \
			echo "    ✖ $$file was skipped"; \
		fi; \
	done
	# minify phonegap-js
	echo "  => ${PHONEGAP_JS_MIN}"
	java -jar ./lib/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar ${PHONEGAP_JS} -o ${PHONEGAP_JS_MIN}
endef