exports.config = {

    // The address of a running selenium server. If specified, Protractor will
    // connect to an already running instance of selenium. This usually looks like
    // seleniumAddress: 'http://localhost:4444/wd/hub'
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 30000,

    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs: ['test/e2e/**/*.js'],

    // Patterns to exclude.
    exclude: [],

    // ----- More information for your tests ----
    //
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9000',

    // ----- The test framework -----
    //
    // Jasmine and Cucumber are fully supported as a test and assertion framework.
    // Mocha has limited beta support. You will need to include your own
    // assertion framework if working with mocha.
    framework: 'jasmine',

    // ----- Options to be passed to minijasminenode -----
    //
    // See the full list at https://github.com/juliemr/minijasminenode
    jasmineNodeOpts: {
      // If true, display spec names.
        isVerbose: true,
      // If true, print colors to the terminal.
        showColors: true,
      // If true, include stack traces in failures.
        includeStackTrace: true,
      // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    },

    // A callback function called once protractor is ready and available, and
    // before the specs are executed
    // You can specify a file containing code to run by setting onPrepare to
    // the filename string.
    onPrepare: function () {
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
           new jasmine.JUnitXmlReporter('target/e2e-coverage', true, true));
    },

    // ----- The cleanup step -----
    //
    // A callback function called once the tests have finished running and
    // the webdriver instance has been shut down. It is passed the exit code
    // (0 if the tests passed or 1 if not).
    onCleanUp: function () {
    }
};
