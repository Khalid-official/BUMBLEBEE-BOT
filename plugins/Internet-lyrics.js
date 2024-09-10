import fg from 'api-dylux';

const handler = async (m, { conn, text }) => {
  const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
  if (!teks) throw `*[❗𝐈𝐍𝐅𝐎❗] Enter the name and the artist of the song*`;
  try {
    const res = await fg.lyrics(teks);
    const mes = `▢ *${res.title}*
🐝 *${res.artist}*

🐝 ${res.lyrics}`;
    conn.reply(m.chat, mes, m);
  } catch (e) {
    m.react('❗'); // Replace 'error' with a suitable reaction or message
  }
};

handler.help = ['lyrics'];
handler.tags = ['tools'];
handler.command = ['testo', 'lyrics', 'letras'];

export default handler;
