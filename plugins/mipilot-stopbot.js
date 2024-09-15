import fs from "fs"
async function handler(m, {conn, usedPrefix}) {
   if (conn.user.jid == global.conn.user.jid) return m.reply(`https://github.com/Khalid-official *[❗] *You can't turn off the main Bot.*`)
   m.reply(`https://github.com/Khalid-official *[❗] *You will stop being a Sub Bot in 5 seconds...*`)
   conn.fstop = true
   conn.ws.close()
}
handler.command = handler.help = ['stopbot', 'byebot'];
handler.tags = ['jadibot'];
handler.owner = true
export default handler; 
