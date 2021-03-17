import { Client } from 'discord.js'

export async function create(channel) {
  channel.createWebhook('DegeneratoruWebhook', {}).then(webhook => {
    console.log(`${webhook} created`)
  }).catch(console.error)
}
