var handler = async (m, { conn, args, text, usedPrefix, command }) => {

let who 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)        
let user = global.db.data.users[who]
let nom = conn.getName(m.sender)
if (!global.db.data.settings[conn.user.jid].restrict) return conn.reply(m.chat, `🚩 *This command is disabled by my creator*`, m, rcanal) 
if (!text) await m.reply(`🍟 *Please enter the number of the person you want to add to this group*.\n\n🚩 Example:\n*${usedPrefix + command}* 66666666666`)
if (text.includes('+')) await m.reply(`🍟 Please enter the number all together without the *(+)*`)
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

await conn.reply(text+'@s.whatsapp.net', `*🍟 Hello! I am Bumblebee-bot, Someone has invited you to their group.*\n\n*Link*\n${link}`, m, {mentions: [m.sender]})
await m.reply(`🍟 *Sending the invitation to the private chat of ${nom}*\n\n*📅 ${fecha}*\n⏰ *${tiempo}*`) 

}
handler.help = ['add']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
