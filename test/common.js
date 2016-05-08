// dependencies
// common setups for tests, run before tests
var env = require('node-env-file');

// set env if not already set externally
// .env must exist if setting env vars externally
try {
  env(__dirname + '/../.env', { overwrite: false });
  // set the port to test
  process.env.NODE_ENV = 'development'
  process.env.PORT = 9090
  console.log("Test is using PORT:", process.env.PORT)
} catch (e) {
  console.log(e)
  if (process.env.TRAVIS) {
    console.log("Using env vars from Travis if exist.")
  } else {
    console.log("No .env and not in Travis, please provide your .env file.")
    process.exit(1)
  }
}

// unit test global dependencies
require('../scripts/_init.js')
global.DEFAULT_ROOM = "bot-test" // set for test
global.Promise.config({ warnings: false });
// chai assertation library
global.chai = require('chai')
global.chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
global.should = chai.should();
// sinon spy/stub library
global.sinon = require('sinon');
global.Helper = require('hubot-test-helper');
// set the hubot say handlers for unit tests: send reply to room
global.say = function(room, name, key) {
  key = key || 'output'
  return _.flow(_.partial(_.get, _, key), _.bind(room.user.say, room, name))
}
// Promise.delay, with adjusted time factors. for use with yield
global.delayer = function(factor) {
  factor = factor || 1
  var timeout = 100 * factor
  if (process.env.TRAVIS) { timeout = 10 * timeout }
  // timeout is capped at 16s
  timeout = _.min([timeout, 16000])
  return Promise.delay(timeout)
}

// declare global assets
global.A = require('./asset')
