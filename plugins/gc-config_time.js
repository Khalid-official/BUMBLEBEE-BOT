/* Credits to https://github.com/ALBERTO9883/NyanCatBot-MD */

let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
   if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
           throw false
   }
   let isClose = {
'open': 'not_announcement',
'buka': 'not_announcement',
       'on': 'not_announcement',
'1': 'not_announcement',
'close': 'announcement',
'tutup': 'announcement',
       'off': 'announcement',
       '0': 'announcement',
   }[(args[0] || '')]
   if (isClose === undefined) {
letcaption = `https://github.com/Khalid-official 
*[❗𝐈𝐍𝐅𝐎❗] Example:*
*${usedPrefix + command} open 1*
*${usedPrefix + command} close 1*
📌 *[❗𝐈𝐍𝐅𝐎❗] _Use example:_* *${usedPrefix + command} close 1*
*_🌿 For the group to be closed for an hour._*
`
       m.reply(caption)
throw false
   }
   let timeoutset = 86400000 * args[1] / 24
   await conn.groupSettingUpdate(m.chat, isClose).then(async _=> {
m.reply(`https://github.com/Khalid-official ⚠️ *[❗𝐈𝐍𝐅𝐎❗] _Group ${isClose == 'announcement' ? 'closed' : 'open'} ${args[1] ? `during *${clockString(timeoutset)}_*` : ''}` )
   })
   if (args[1]) {
setTimeout(async() => {
             await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async _=>{
conn.reply(m.chat, `${isClose == 'not_announcement' ? '*[❗𝐈𝐍𝐅𝐎❗] The group has been closed, now only admins can send messages!*' : '*The group has been opened, now all members can send messages!*'}!`)
})
         }, timeoutset)
   }
   }
handler.help = ['grouptime *<open/close>* *<number>*']
handler.tags = ['group']
handler.command = /^(grouptime|gctime)$/i

handler.botAdmin = true
handler.group = true

export default handler

function clockString(ms) {
   let h = Math.floor(ms / 3600000)
   let m = Math.floor(ms / 60000) % 60
   let s = Math.floor(ms / 1000) % 60
   console.log({ms,h,m,s})
   return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}