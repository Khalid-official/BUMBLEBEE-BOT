
let handler = async (m, { text }) => {
  if (!text) throw `*[❗𝐈𝐍𝐅𝐎❗]  Enter the name and folder of the image you want to view.*`;
  let ext = text.split('.').pop();
  let path = `${text}`;
  if (!fs.existsSync(path)) throw `*[❗𝐈𝐍𝐅𝐎❗] The image does not exist in the root folder.*`;
  let media = await fs.readFileSync(path);
  let mimeType = `image/${ext}`;
  m.reply(media, null, { thumbnail: await (await fetch(`data:${mimeType};base64,${media.toString('base64')}`)).buffer() });
};

handler.help = ['viewimage <nome>'];
handler.tags = ['tools'];
handler.command = /^(viewimage|vi)$/i;
handler.owner = true;

export default handler;
