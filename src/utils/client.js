import { Client } from 'discord.js'
import config from '../config'

const client = new Client();

client.once('ready', () => {
  console.log('Bot ready!')
})
client.login(config.get('token')).then(response => {
  console.log(`Bot login: ${response}`)
}).catch(console.error)

export default client