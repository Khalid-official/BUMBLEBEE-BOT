let handler = async (m, { conn, command, text }) => {
let love = `https://github.com/Khalid-official *❤️❤️ LOVE METER ❤️❤️*
*[❗𝐈𝐍𝐅𝐎❗] The love for ${text} For you it is* *${Math.floor(Math.random() * 100)}%* *of a 100%*
*[❗𝐈𝐍𝐅𝐎❗] You should ask her to be your girlfriend*
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(love)$/i
export default handler