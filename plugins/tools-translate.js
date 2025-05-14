import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
let handler = async (m, { args, usedPrefix, command }) => {
let msg = `https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] correct use of command  ${usedPrefix + command} (idioma) (texto)*\n*example:*\n*${usedPrefix + command} en Hello*\n\n*𝙲𝙾𝙽𝙾𝙲𝙴 𝙻𝙾𝚂 𝙸𝙳𝙸𝙾𝙼𝙰𝚂 𝙰𝙳𝙼𝙸𝚃𝙸𝙳𝙾𝚂 𝙴𝙽:*\n*- https://cloud.google.com/translate/docs/languages*`
if (!args || !args[0]) return m.reply(msg)  
let lang = args[0]
let text = args.slice(1).join(' ')
const defaultLang = 'es'
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')}
if (!text && m.quoted && m.quoted.text) text = m.quoted.text
try {      
let result = await translate(`${text}`, { to: lang, autoCorrect: true })
await m.reply('https://github.com/Khalid-official *translation:* ' + result.text)
} catch {
try {    
let lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`)
let loll = await lol.json()
let result2 = loll.result.translated
await m.reply('https://github.com/Khalid-official *Translation:* ' + result2)
} catch { 
await m.reply('*[❗𝐈𝐍𝐅𝐎❗] ERROR,  occurred please try again later *')    
}}}
handler.command = /^(translate|traducir|trad)$/i
export default handler
