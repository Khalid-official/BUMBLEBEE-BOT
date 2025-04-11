let handler = async (m, { conn, usedPrefix, command }) => {
const userProfile = conn.user.jid || global.conn.user.jid
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) throw `*[❌] Image not found, please reply to an image using the command ${usedPrefix + command}*`;
await conn.updateProfilePicture(userProfile, img).then(_ => m.reply("*[✅] Successfully changed the profile picture of the bot number*"))
} else throw `*[❌] Error Occured*`
}
handler.help = ["setppbot"]
handler.tags = ["owner"]
handler.command = /^setppbot|cambiafoto|fotobot$/i;
handler.owner = true;

export default handler;
