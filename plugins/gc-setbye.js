//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
   if (text) {
     global.db.data.chats[m.chat].sBye = text
     m.reply('https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗]  Goodbye message set*')
   } else throw `✳️ Enter the message\n@user (mention)`
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['setbye']
handler.admin = true
handler.owner = false

export default handler