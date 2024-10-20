import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, {conn, command, args, text, usedPrefix}) => {

if (!text) return conn.reply(m.chat, `🚩 *Enter a song name or a YouTube link*\n\nExample, !${command} *Alone ft Alan walker*`,  m, rcanal, )

conn.reply(m.chat, global.wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})

try { 
const yt_play = await search(args.join(' '))
let txt = `*乂  Y O U T U B E  -  P L A Y  乂*\n\n`
    txt += `🚩 *Title:*\n${yt_play[0].title}\n\n`
    txt += `📅 *Published:*\n${yt_play[0].ago}\n\n`
    txt += `🕜 *Duration:*\n${secondString(yt_play[0].duration.seconds)}\n\n`
    txt += `📎 *Url:*\n${yt_play[0].url}`

let listSections = []
listSections.push({
title: `✎*SELECTION*`, highlight_label: ``,
rows: [
{
header: "𓆩࿔ྀુ⃟🌹⃟𝘼𝙐𝘿𝙄𝙊 ╎ 🎵",
title: "",
description: `🎵 Audio.`,
id: `#play1 mp3 ${text}`,
},
{
header: "𓆩࿔ྀુ⃟🌹⃟𝙑𝙄𝘿𝙀𝙊 ╎ 📽",
title: "",
description: `📽 Video.`,
id: `#play1 mp4 ${text}`,
},
{
header: "𓆩࿔ྀુ⃟🌹⃟𝘼𝙐𝘿𝙄𝙊𝘿𝙊𝘾 ╎ 🎵",
title: "",
description: `🎵 AudioDoc.`,
id: `#play1 mp3doc ${text}`,
},
{
header: "𓆩࿔ྀુ⃟🌹⃟𝙑𝙄𝘿𝙀𝙊𝘿𝙊𝘾 ╎ 📽",
title: "",
description: `📽 VideoDoc.`,
id: `#play1 mp4doc ${text}`,
},
],
})
let menu = ''
await conn.sendListB(m.chat, menu, txt, ` 𓏲᭨ ̤̤֟✧⏤͟͞ू⃪٭ۣۜ ፝͜𝐭𝐡𝐞 𝐛𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞 𝐛𝐨𝐭⁞᭄፝🍟𑜟꙲𒁑⁩`, yt_play[0].thumbnail, listSections, m)
await m.react(done)
} catch {
await conn.reply(m.chat, `✘ *An error occured*`, m, rcanal)
}}
handler.help = ['play', 'play2'];
handler.tags = ['descargas'];
handler.command = ['play', 'play2']
handler.register = true;
export default handler;

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
}
