//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner} ) => {
     if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
     global.db.data.chats[m.chat].isBanned = false
     m.reply('https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] The bot is now activated in this group🔓*')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = ['chaton', 'unbanchat']

export default handler