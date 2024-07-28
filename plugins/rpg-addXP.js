//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '*[❗𝐈𝐍𝐅𝐎❗] Tag the user*'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw 'https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] Enter the amount of XP you want to add*'
  if (isNaN(txt)) throw ' https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] 🔢 only numbers*'
  let xp = parseInt(txt)
  let exp = xp
  
  if (exp < 1) throw '✳️ Mínimum *1*'
  let users = global.db.data.users
  users[who].exp += xp

  await m.reply(`https://github.com/Khalid-official ≡ *[❗𝐈𝐍𝐅𝐎❗] XP ADDED*
┌──────────────
🐝  *Total:* ${xp}
└──────────────`)
 conn.fakeReply(m.chat, `,*[❗𝐈𝐍𝐅𝐎❗] 🐝 Did you recieve* \n\n *+${xp} XP*`, who, m.text)
}

handler.help = ['addxp <@user>']
handler.tags = ['economy']
handler.command = ['addxp'] 
handler.rowner = true

export default handler