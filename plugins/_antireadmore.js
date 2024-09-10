import * as fs from 'fs';

export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
  if (m.isBaileys && m.fromMe) {
    return true; // Skip processing if the message is from Baileys' bot
  }

  if (!m.isGroup) return false; // Only process messages in groups

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const delet = m.key.participant;
  const bang = m.key.id;
  const name = await conn.getName(m.sender);

  // Define "read more" triggers
  const readMoreTriggers = ['read more', 'continue reading', 'see more'];

  // Check if the message contains "read more" or similar text
  const isReadMoreMessage = readMoreTriggers.some(trigger => m.text && m.text.toLowerCase().includes(trigger));

  if (chat.antiTraba && isReadMoreMessage) {
    if (isAdmin) return; // If the sender is an admin, do nothing

    if (isBotAdmin && bot.restrict) {
      // Delete the offending message
      conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });

      // Kick the user
      setTimeout(() => {
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
          .catch(err => console.error('Failed to kick user:', err));
      }, 1000);
    } else if (!bot.restrict) return;
  }

  return true;
}
