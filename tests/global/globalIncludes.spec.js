/*
 *  Enclave Tests
 *  enclave uses two types of testing frameworks, ava for unit tests and
 *  Xcode UITest for integration testing. After commit, these tests will be ran
 *  on the CircleCI and Codeship environment to ensure the code change does not
 *  alter crusial business logic. If you need to modify the test file, please check
 *  with Siyuan Gao <siyuan@ricepo.com>
 */

import test from 'ava';

import { Assets, Tags, Languages, Selectors, Actions } from '../../src/global/globalIncludes';

test('Assets', t => {
    t.is(typeof Assets, 'object');
});
test('Tags', t => {
    t.is(typeof Tags, 'object');
});
test('Languages', t => {
    t.is(typeof Languages, 'object');
});
test('Selectors', t => {
    t.is(typeof Selectors, 'object');
});
test('Actions', t => {
    t.is(typeof Actions, 'object');
});
