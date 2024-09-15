export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;

  // Check if the sender's phone number starts with +263
  const senderNumber = m.sender.split('@')[0]; // Extract the sender's phone number
  const isZimbabweNumber = senderNumber.startsWith('263'); // Check if it starts with 263

  if (isZimbabweNumber) {
    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};
    
    if (bot.antiZimbabwe && !isOwner && !isROwner) {
      await m.reply(`https://github.com/Khalid-official _*< ANTI-ZIMBABWE />*_\n\n*[❗𝐈𝐍𝐅𝐎❗]  The anti-zimbabwe feature is enabled, +263 users are not allowed to use the bot privately, hence, you will be blocked.*`, false, {mentions: [m.sender]});
      await this.updateBlockStatus(m.chat, 'block');
    }
  }

  return !1;
}
