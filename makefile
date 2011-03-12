.SILENT: init

VERBOSE=--quiet

QUNIT_DIR=test/qunit
QUNIT_GIT=git://github.com/jquery/qunit.git

MOBILE_SPEC_DIR=test/mobile-spec
MOBILE_SPEC_GIT=git://github.com/phonegap/mobile-spec.git

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
