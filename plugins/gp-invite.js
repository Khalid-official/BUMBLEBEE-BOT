let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) throw `https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] Enter the number you want to send a group invite to*\n\n📌 Example :\n*${usedPrefix + command}* 59172945992`
if (text.includes('+')) throw `https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] Enter the number all together without the *+*`
if (isNaN(text)) throw 'https://github.com/Khalid-official  *[❗𝐈𝐍𝐅𝐎❗] Enter only numbers plus your country code with no spaces*'
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
 
       await conn.reply(text+'@s.whatsapp.net', `≡ *GROUP INVITE*\n\n*[❗𝐈𝐍𝐅𝐎❗] You were invited to join this group by a user* \n\n${link}`, m, {mentions: [ m.sender]})
         m.reply(`*[❗𝐈𝐍𝐅𝐎❗] An invitation link was sent to the user*`)

}
handler.help = ['invite <549xxx>']
handler.tags = ['group']
handler.command = ['invite','invite']
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler