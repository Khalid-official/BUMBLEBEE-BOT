let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) throw 'https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗]️ Respond to an image.*'
await conn.updateProfilePicture(m.chat, img).then(_ => m.reply('https://github.com/Khalid-official ⚘[❗𝐈𝐍𝐅𝐎❗] *_Picture updated successfully._*'))
} else throw 'https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] Respond to an image.*'}
handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler