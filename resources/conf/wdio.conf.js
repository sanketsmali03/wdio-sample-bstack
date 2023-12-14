const wdioParallel = require('wdio-cucumber-parallel-execution');

const sourceSpecDirectory = `resources/features`;
let featureFilePath = `${sourceSpecDirectory}/*.feature`;
const rimraf = require('rimraf');

exports.config = {
    logLevel: 'debug',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            useCucumberStepReporter: true,
        }]
    ],
    cucumberOpts: {
        require: ['./src/stepdefs/*.steps.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    async onPrepare(config, capabilities) {
        tmpSpecDirectory = `${sourceSpecDirectory}/tmp`;
        wdioParallel.performSetup({
            sourceSpecDirectory: sourceSpecDirectory,
            tmpSpecDirectory: tmpSpecDirectory,
            cleanTmpSpecDirectory: true
        });
        featureFilePath = `${tmpSpecDirectory}/*.feature`
    },

    afterScenario: async (world, result) => {
        console.log("Result: " + result.passed);
        if (!result.passed) {
            await browser.takeScreenshot()
            browser.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "' + world.pickle.name + ' Scenario Has Failed"}}');
        } else {
            browser.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "' + world.pickle.name + ' Scenario Has Passed"}}');
        }

        browser.execute('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "' + world.pickle.name + '"}}');
        // browser.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "' + world.pickle.name + ' Scenario Has Passed"}}');
        console.log('IN THE AFTER SCENARIO');
    },

    onComplete(exitCode, config, capabilities) {
        rimraf("resources/features/tmp", function() { console.log('Directory deleted'); })
    }
}
