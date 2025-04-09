import fetch from 'node-fetch';
import yts from 'yt-search';
import { ytmp3, ytmp4 } from '@hiudyy/ytdl';

let handler = async (m, { conn, args, text, command }) => {
  if (!text) throw `*[❗] Please enter the song name*\nUsage: .${command} [song name]`;

  let res = await yts(text);
  let vid = res.videos[0];
  if (!vid) throw '*[❗] No results found*';

  let caption = `🎵 *Title:* ${vid.title}\n⏱️ *Duration:* ${vid.timestamp}\n👀 *Views:* ${vid.views}\n📆 *Uploaded:* ${vid.ago}\n🔗 *Link:* ${vid.url}\n\n_★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★_`;

  await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption }, { quoted: m });

  try {
    if (command === 'play') {
      let audioInfo = await ytmp3(vid.url);
      await conn.sendMessage(m.chat, {
        audio: { url: audioInfo.url },
        mimetype: 'audio/mpeg',
        fileName: `${vid.title}.mp3`,
        ptt: false
      }, { quoted: m });
    } else if (command === 'play2') {
      let videoInfo = await ytmp4(vid.url);
      await conn.sendMessage(m.chat, {
        video: { url: videoInfo.url },
        mimetype: 'video/mp4',
        fileName: `${vid.title}.mp4`,
        caption: `_★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★_`
      }, { quoted: m });
    }
  } catch (e) {
    console.error(e);
    m.reply(`*[❌] Failed to download or send media.*`);
  }
};

handler.command = ['play', 'play2'];
export default handler;
