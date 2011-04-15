.SILENT: init build clean

VERBOSE = --quiet

QUNIT_DIR = test/qunit
QUNIT_GIT = git://github.com/jquery/qunit.git

MOBILE_SPEC_DIR = test/mobile-spec
MOBILE_SPEC_GIT = git://github.com/phonegap/mobile-spec.git

FILES = src/phonegap.core.js \
        lib/phonegap.js \
        src/accelerometer.js \
        src/camera.js \
        src/contact.js \
        src/device.js \
        src/file.js \
        src/geolocation.js \
        src/network.js \
        src/notification.js \
        src/position.js

VERSION = $(strip $(shell cat VERSION))

BUILD_DIR      = build
BUILD_FILE     = phonegap.${VERSION}.js
BUILD_MIN_FILE = phonegap.${VERSION}.min.js

define clone_or_pull
	if test -d $(strip ${1})/.git; then \
		echo "Pulling $(strip ${1})..."; \
		git --git-dir=$(strip ${1})/.git pull ${VERBOSE} origin master; \
	else \
		echo "Cloning $(strip ${1})..."; \
		git clone ${VERBOSE} --depth=1 $(strip ${2}) $(strip ${1}); \
	fi
endef

init:
	$(call clone_or_pull, ${QUNIT_DIR}, ${QUNIT_GIT})
	$(call clone_or_pull, ${MOBILE_SPEC_DIR}, ${MOBILE_SPEC_GIT})

build: clean init
	echo "Building..."
	mkdir -p ${BUILD_DIR}
	echo " => ${BUILD_DIR}/${BUILD_FILE}"
	cat ${FILES} > ${BUILD_DIR}/${BUILD_FILE}
	echo " => ${BUILD_DIR}/${BUILD_MIN_FILE}"
	java -jar ./lib/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar ${BUILD_DIR}/${BUILD_FILE} -o ${BUILD_DIR}/${BUILD_MIN_FILE}

clean:
	if test -d ${BUILD_DIR}; then \
		rm -rf ${BUILD_DIR}; \
	fi
