require('babel-register')
var config = require('../../config')

const TRAVIS = process.env.TRAVIS_JOB_NUMBER ? true : false
const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: TRAVIS ? 80 : 4444,
      selenium_host: TRAVIS ? 'ondemand.saucelabs.com' : 'localhost',
      username: TRAVIS ? process.env.SAUCE_USERNAME : undefined,
      password: TRAVIS ? process.env.SAUCE_ACCESS_KEY : undefined,
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        build: `build-${TRAVIS_JOB_NUMBER}`,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
