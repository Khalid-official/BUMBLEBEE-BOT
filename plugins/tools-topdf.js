import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] Tag or respond to an image*'    
let img = await q.download?.()
let url = await uploadImage(img)    
let docname = text ? text : m.pushName || 'documento'
conn.sendFile(m.chat, `http://api.lolhuman.xyz/api/convert/imgtopdf?apikey=${lolkeysapi}&img=${url}`, docname + '.pdf', '', m, false, { asDocument: true })
}
handler.command = /^topdf$/i
export default handler