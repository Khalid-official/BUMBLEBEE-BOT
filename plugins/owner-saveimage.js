import fs from 'fs';

let handler = async (m, { text }) => {
  if (!text) throw `https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] Enter a name for your image file and the desired extension (e.g. name.png, name.jpg, etc*.)`;
  if (!m.quoted || !m.quoted.fileSha256) throw `*[❗𝐈𝐍𝐅𝐎❗] Respond to the image you want to save..*`;
  let media = await m.quoted.download();
  /*o donde quieras guardar las imágenes*/
  const path = `src/${text}`;
  await fs.writeFileSync(path, media);
  m.reply(`*[❗𝐈𝐍𝐅𝐎❗] Image saved as ${path}`);
};

handler.help = ['saveimage <nome>'];
handler.tags = ['tools'];
handler.command = /^(saveimage|sp)$/i;
handler.owner = true;

export default handler;
