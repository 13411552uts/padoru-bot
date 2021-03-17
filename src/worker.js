import client from './utils/client'
import _ from 'lodash'
import { create as createWebhook } from './utils/webhook'
import config from './config'

const prefixs = ['||mongmeo||', '||monihorny||']

client.on('message', async(message )=> {
  if (message.author.bot) return
  if (!message.content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) return
  let msg = message.content
  for (const prefix of prefixs) {
    if (message.content.startsWith(prefix)) {
      msg = message.content.substr(prefix.length,message.content.length)
      await sendMessageWebhook(message, msg)
      return
    }
  }
  msg = message.content
  const args = message.content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)
  //console.log(args)
  while(args.length > 0) {
    const emoji = args.shift()
    const emojiName = emoji.split(':')[1]
    if (!(emojiName.endsWith("oru") || emojiName.toLowerCase().includes("padoru"))) {
      let partOne = msg.substr(0, msg.indexOf(emoji) - 1)
      let partTwo = msg.substr(msg.indexOf(emoji) + emoji.length, msg.length)
      msg = `${partOne}<a:padoru:662151110471057428>${partTwo}`
    }
  }
  await sendMessageWebhook(message, msg)
})

async function sendMessageWebhook(message, msg) {
  const channel = message.channel
  const webhooks = await channel.fetchWebhooks()
  if (!webhooks.first()) await createWebhook(channel)
  await webhooks.first().send(msg, {
    username: message.author.username,
    avatarURL: message.author.avatarURL()
  }).catch(console.error)
  await message.delete()
}