'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//单引号又加双引号？什么情况
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL:'"/admin"'
})
