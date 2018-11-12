#! /usr/bin/env node

const Git = require('nodegit')
const Promise = require('bluebird')
const rimraf = Promise.promisify(require('rimraf'))

const REPOSITORY_URL = 'https://github.com/HKV-products-services/create-hkv-app'
const DESTINATION_DIR = './tmp'


rimraf(DESTINATION_DIR)
  .then(() => {
    console.log(`Clean up ${DESTINATION_DIR} before clone`)
    return Git.Clone(REPOSITORY_URL, DESTINATION_DIR)
  })
  .then((repo) => {
    console.log(`Cloned repository successfully into ${DESTINATION_DIR}`)
    return rimraf(`${DESTINATION_DIR}/.git`)
  })
  .then(() => {
    console.log('Done cloning repository')
  })
  .catch(error => {
    console.log('Error cloning repository', error)
  })