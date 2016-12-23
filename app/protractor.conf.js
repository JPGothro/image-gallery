exports.config = {

    allScriptsTimeout: 11000,

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    },

    // specs and suites are mutually exclusive.
    // list of file globs
    specs: [
        'test-e2e-babel/**/*.js'
    ],

    // OR, define suites: specific ones or sets of tests
    // suites: {
    //     home: 'test-e2e/home.test.js',
    //     full: 'test-e2e/**/*.test.js'
    // },

    capabilities: {
        browserName: 'chrome'
    },

    // Leaving this out will cause Protractor to start one for the test
    // seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'http://localhost:8080',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        print: function() {}
    }
};
