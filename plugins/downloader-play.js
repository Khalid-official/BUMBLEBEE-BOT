import fetch from 'node-fetch';
import axios from 'axios';
import yts from 'yt-search';
import { ogmp3 } from '../src/libraries/youtubedl.js'; 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ytmp3, ytmp4 } = require("@hiudyy/ytdl");

let handler = async (m, { conn, args, text, usedPrefix, command }) => {    
const datas = global;
const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje;
const _translate = JSON.parse(fs.readFileSync(`./src/languages/en.json`));
const tradutor = _translate.plugins.descargas_play;
if (!text) throw `${tradutor.texto1[0]} ${usedPrefix + command} ${tradutor.texto1[1]}`;
      
  let additionalText = '';
  if (['play'].includes(command)) {
    additionalText = 'audio';
  } else if (['play2'].includes(command)) {
    additionalText = 'vídeo';
 }

const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
const texto1 = `◉—⌈🎶🐝 𝗕𝗘𝗘 𝗠𝗨𝗦𝗜𝗖🎶⌋—◉*\n\n❏ 📌 *𝗧𝗶𝘁𝗹𝗲:* ${yt_play[0].title}\n❏ 📆 *𝗽𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱:*  ${yt_play[0].ago}\n❏ ⌚ *Dur𝗮𝘁𝗶𝗼𝗻:* ${secondString(yt_play[0].duration.seconds)}\n❏ 👀 *Vi𝗲𝘄𝘀:* ${MilesNumber(yt_play[0].views)}\n❏ 👤 *Au𝘁𝗵𝗼𝗿:*  ${yt_play[0].author.name}\n❏ 🔗 *L𝗶𝗻𝗸:* ${yt_play[0].url.replace(/^https?:\/\//, '')}\n\n> *_Downloading ${additionalText}, please wait．．．_*`.trim();

conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1 }, { quoted: m });

if (command === 'play') {
try {
const audiodlp = await ytmp3(yt_play[0].url);await conn.sendMessage(m.chat, { document: audiodlp, mimetype: 'audio/mpeg',
  fileName: `${yt_play[0].title}.mp3`,
  caption: `_★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★_`
}, { quoted: m });
} catch {   
try {                   
const [input, quality = '320'] = text.split(' '); 
const validQualities = ['64', '96', '128', '192', '256', '320'];
const selectedQuality = validQualities.includes(quality) ? quality : '320';
const res = await ogmp3.download(yt_play[0].url, selectedQuality, 'audio');

await conn.sendMessage(m.chat, { document: { url: res.result.download }, mimetype: 'audio/mpeg',
  fileName: `${yt_play[0].title}.mp3`,
  caption: `_★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★_`
}, { quoted: m });
} catch {   
try {
const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${yt_play[0].url}`);
let { data } = await res.json();

await conn.sendMessage(m.chat, { document: { url: data.dl }, mimetype: 'audio/mpeg',
  fileName: `${yt_play[0].title}.mp3`,
  caption: `_★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★_`
}, { quoted: m });
} catch {
try {  
const res = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${yt_play[0].url}`)
let data = await res.json();

await conn.sendMessage(m.chat, { document: { url: data.data.downloadUrl }, mimetype: 'audio/mpeg',
  fileName: `${yt_play[0].title}.mp3`,
  caption: `_★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★_`
}, { quoted: m });
} catch {
try {
      const apidownload = await axios.get(`https://skynex.boxmine.xyz/docs/download/ytmp3?url=https://youtube.com/watch?v=${yt_play[0].videoId}&apikey=GataDios`)
      const responsev2 = await apidownload.data.data.download;
     
                
      await conn.sendMessage(m.chat, { document: { url: responsev2 }, mimetype: 'audio/mpeg',
  fileName: `${yt_play[0].title}.mp3`,
  caption: `_★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★_`
}, { quoted: m });
        } catch (e) {
        conn.reply(m.chat, `*[ ❌️ ] An error occurred while processing your request.*\n\n${e}`, m);
        }
    }}}}}
    
    if (command === 'play') {
        try {
const video = await ytmp4(yt_play[0].url);
await conn.sendMessage(m.chat, { document: { url: video }, fileName: `${yt_play[0].title}.mp4`, mimetype: 'video/mp4', caption: `${yt_play[0].title}`}, { quoted: m })
} catch {
try {   
const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${yt_play[0].url}`);
let { data } = await res.json();
await conn.sendMessage(m.chat, { document: { url: data.dl }, fileName: `${yt_play[0].title}.mp4`, mimetype: 'video/mp4', caption: `${yt_play[0].title}`}, { quoted: m })
} catch {
try {  
const res = await fetch(`https://api.agatz.xyz/api/ytmp4?url=${yt_play[0].url}`)
let data = await res.json();
await conn.sendMessage(m.chat, { document: { url: data.data.downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `${yt_play[0].title}` }, { quoted: m }) 
} catch {
try {
const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${yt_play[0].url}`)
let { result } = await res.json()
await conn.sendMessage(m.chat, { document: { url: result.download.url }, fileName: `${yt_play[0].title}.mp4`, caption: `${yt_play[0].title}` }, { quoted: m }) 
} catch {
try {
const axeelApi = `https://axeel.my.id/api/download/video?url=${yt_play[0].url}`;
const axeelRes = await fetch(axeelApi);
const axeelJson = await axeelRes.json();
if (axeelJson && axeelJson.downloads?.url) {
const videoUrl = axeelJson.downloads.url;
await conn.sendMessage(m.chat, { document: { url: videoUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `${yt_play[0].title}` }, { quoted: m }) 
}} catch {
try {              
const apidownload = await axios.get(`https://skynex.boxmine.xyz/docs/download/ytmp4?url=https://youtube.com/watch?v=${yt_play[0].videoId}&apikey=GataDios`)
 const responsev2 = await apidownload.data.data.download;         
   await conn.sendMessage(m.chat, { document: { url: responsev2 }, mimetype: 'video/mp4' }, { quoted: m });
   } catch (e) {
    conn.reply(m.chat, `*[ ❌️ ] An error occurred while processing your request.*\n\n${e}`, m);
   }
  }}
 }}
}}
};

handler.command = ['play', 'play2', 'play1doc', 'play2doc'];

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
  const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
  });
}

const getBuffer = async (url, options) => {
    options ? options : {};
    const res = await axios({method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1,}, ...options, responseType: 'arraybuffer'});
    return res.data;
};
