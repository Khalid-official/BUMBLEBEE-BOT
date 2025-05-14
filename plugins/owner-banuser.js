//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
     if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
     else who = m.chat
     let user = global.db.data.users[who]
     if (!who) throw `https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] Tag or mention someone*\n\n📌 *Example : *${usedPrefix + command} @user`
     let users = global.db.data.users
     users[who].banned = true
     conn.reply(m.chat, `https://github.com/Khalid-official 
     [❗𝐈𝐍𝐅𝐎❗] 
✅ BANNED

───────────
@${who.split`@`[0]} *will no longer be able to use my commands* `, m, { mentions: [who] })
}
handler.help = ['ban @user']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.owner = true

export default handler