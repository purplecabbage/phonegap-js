.SILENT: build check update clean

VERBOSE = --quiet

QUNIT_DIR = test/qunit
QUNIT_GIT = git://github.com/jquery/qunit.git

MOBILE_SPEC_DIR = test/mobile-spec
MOBILE_SPEC_GIT = git://github.com/phonegap/mobile-spec.git

PHONEGAP_JS_FILE = lib/phonegap/phonegap.js

FILES = src/phonegap.core.js \
        ${PHONEGAP_JS_FILE} \
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

build: clean check update
	echo "Building..."
	mkdir -p ${BUILD_DIR}
	echo " => ${BUILD_DIR}/${BUILD_FILE}"
	cat ${FILES} > ${BUILD_DIR}/${BUILD_FILE}
	echo " => ${BUILD_DIR}/${BUILD_MIN_FILE}"
	java -jar ./lib/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar ${BUILD_DIR}/${BUILD_FILE} -o ${BUILD_DIR}/${BUILD_MIN_FILE}

check:
	echo "Checking dependencies..."
	if [ ! -e ${PHONEGAP_JS_FILE} ]; then echo " => Error: Cannot find ${PHONEGAP_JS_FILE}"; exit 1; fi

update:
	$(call clone_or_pull, ${QUNIT_DIR}, ${QUNIT_GIT})
	$(call clone_or_pull, ${MOBILE_SPEC_DIR}, ${MOBILE_SPEC_GIT})

clean:
	if test -d ${BUILD_DIR}; then \
		rm -rf ${BUILD_DIR}; \
	fi
