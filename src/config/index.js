require('dotenv').config();

import convict from 'convict'

const config = convict({
  env: {
    format: ['production','dev','test'],
    arg: 'nodeEnv',
    env: 'NODE_ENV',
    default: 'dev'
  },
  token: {
    doc: 'The magical token',
    env: 'BOT_TOKEN',
    default: process.env.BOT_TOKEN
  },
  port: {
    doc: 'port, for fun',
    env: 'PORT',
    default: 8080
  }
})
config.validate({allowed: 'strict'})

export default config