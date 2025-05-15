import fs from 'fs';
import path from 'path';
import { promises as fsp } from 'fs';
import { exec } from 'child_process';

const handler = async (m, { conn }) => {
  const baseDir = './user-database';
  const chatDir = path.join(baseDir, 'chats');
  const mediaDir = path.join(baseDir, 'media');

  // Create folders if not exist
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
  if (!fs.existsSync(chatDir)) fs.mkdirSync(chatDir);
  if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir);

  // Save private chat text messages
  if (m.isBot === false && m.chat.endsWith('@s.whatsapp.net') && m.text) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(chatDir, `${m.sender.replace(/[@.]/g, '_')}_${timestamp}.txt`);
    const content = `[${new Date().toLocaleString()}] ${m.pushName || 'Unknown'}: ${m.text}\n`;

    await fsp.writeFile(filePath, content);
  }

  // Save private chat media (photo, video, audio)
  if (m.isBot === false && m.chat.endsWith('@s.whatsapp.net') && (m.mimetype || m.quoted?.mimetype)) {
    const mediaMsg = m.mimetype ? m : m.quoted;
    const ext = mediaMsg.mimetype.split('/')[1];
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(mediaDir, `${m.sender.replace(/[@.]/g, '_')}_${timestamp}.${ext}`);

    try {
      const buffer = await mediaMsg.download();
      await fsp.writeFile(filePath, buffer);
    } catch (e) {
      console.error('Failed to save media:', e);
    }
  }

  // On command, send database info & zipped files
  if (/^(database|jumlahdatabase|chats)$/i.test(m.text)) {
    const totalreg = Object.keys(global.db.data.users).length;
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.msgs === true).length;

    // Zip the folders
    const zipFile = './user-database.zip';
    await new Promise((resolve, reject) => {
      exec(`zip -r ${zipFile} user-database`, (err, stdout, stderr) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Send reply & zip file
    await conn.reply(m.chat, `*[❗INFO❗] The current number of database users is ${totalreg}*\n\nSending user chat & media database...`, m);
    await conn.sendFile(m.chat, zipFile, 'user-database.zip', 'Here is the full chat & media backup.', m);
  }
};

handler.help = ['database', 'user'];
handler.tags = ['info'];
handler.command = /^(database|jumlahdatabase|chats)$/i;
handler.limit = true;

export default handler;q
