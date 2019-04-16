'use strict'

const assert = require('assert')
const test = require('tap').test
assert(test !== null)

const sshExec = require('../') // reference the library
assert(sshExec !== null)

/** @test {sshExec} */
test('ensure objects exported by the library, exists and are of the right type', (t) => {
  t.plan(2)

  const sshExec = require('../') // reference the library
  assert(sshExec !== null)
  assert.strictEqual(typeof sshExec, 'function')
  t.ok(sshExec)
  t.strictEqual(typeof sshExec, 'function')
})

/** @test {sshExec} */
test('execute a command via ssh to root@localhost with default options, and ensure all is good', (t) => {
  if (process.env.SSH_LOCALHOST_DEFAULT_ENABLE_TEST !== 'true') {
    t.plan(1)
    t.comment('skipped test to root@localhost with default options')
    t.pass('test skipped, because env var SSH_LOCALHOST_DEFAULT_ENABLE_TEST is not defined')
  } else {
    t.plan(1)
    t.comment('run test to root@localhost with default options')
    sshExec('ls -lh', 'root@localhost').pipe(process.stdout)
    t.ok(sshExec)
    // TODO: find a way to get stream output (maybe with a callback) and do some tests on it here ... wip
  }
})

// TODO: connect via ssh to a running container, with username and password ... add a note in the container, to re-enable it ... wip
/** @test {sshExec} */
test('execute a command via ssh on localhost with username and password, and ensure all is good', (t) => {
  if (process.env.SSH_LOCALHOST_USERPASS_ENABLE_TEST !== 'true') {
    t.plan(1)
    t.comment('skipped test on localhost with username and password')
    t.pass('test skipped, because env var SSH_LOCALHOST_USERPASS_ENABLE_TEST is not defined')
  } else {
    t.plan(1)
    t.comment('run test on localhost with username and password')
    sshExec(`echo 'Remote host is:'; hostname; ls -lh`, {
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      user: process.env.SSH_USER,
      password: process.env.SSH_PASS
      // key: process.env.SSH_KEY
    }).pipe(process.stdout)
    t.ok(sshExec)
    // TODO: find a way to get stream output (maybe with a callback) and do some tests on it here ... wip
  }
})

// TODO: connect via ssh to a running container, with root and key ... enable and then test it ... wip
/** @test {sshExec} */
test('execute a command via ssh on localhost with username and key, and ensure all is good', (t) => {
  if (process.env.SSH_LOCALHOST_USERKEY_ENABLE_TEST !== 'true') {
    t.plan(1)
    t.comment('skipped test on localhost with username and key')
    t.pass('test skipped, because env var SSH_LOCALHOST_USERKEY_ENABLE_TEST is not defined')
  } else {
    t.plan(1)
    t.comment('run test on localhost with username and key')
    sshExec(`echo 'Remote host is:'; hostname; ls -lh`, {
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      user: process.env.SSH_USER,
      key: process.env.SSH_KEY
    }).pipe(process.stdout)
    t.ok(sshExec)
    // TODO: find a way to get stream output (maybe with a callback) and do some tests on it here ... wip
  }
})
