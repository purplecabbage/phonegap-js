.SILENT: help build check update clean

VERSION = $(strip $(shell cat VERSION))

BUILD_DIR       = build
PHONEGAP_JS     = ${BUILD_DIR}/phonegap.${VERSION}.js
PHONEGAP_JS_MIN = ${BUILD_DIR}/phonegap.${VERSION}.min.js

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
	echo "  help ......... This help menu."
	echo "  build ........ Generate build/phonegap.x.x.x.js."
	echo "  check ........ Dependency check."
	echo "  update ....... Update submodules."
	echo

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
