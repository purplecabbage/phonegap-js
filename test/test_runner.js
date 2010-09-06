var Tests = function() {
    this.TEST_TIMEOUT = 15000;
};

var tests = new Tests();

// Runs each function in Tests that contains 'Tests' in the name.
function run() {
    for (var t in tests) {
        if (t.indexOf('Tests') > -1) {
            tests[t]();
        }
    }
}

document.addEventListener('deviceready', run, false);