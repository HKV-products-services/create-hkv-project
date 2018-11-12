#! /usr/bin/env node

const Git = require('nodegit')
const Promise = require('bluebird')
const rimraf = Promise.promisify(require('rimraf'))
const commandLineArgs = require('command-line-args')

const options = commandLineArgs([
  { name: 'projectDir', type: String, multiple: false, defaultOption: true },
])

if(!options.projectDir) {
  process.exit(1)
}

const DESTINATION_DIR = options.projectDir
const REPOSITORY_URL = 'https://github.com/HKV-products-services/create-hkv-app'

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