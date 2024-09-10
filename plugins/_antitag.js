const handler = (m) => m;

handler.before = async function(m) {
  const MAX_TAGS = 5; // Maximum number of tags allowed

  if (m.mentionedJid.length > MAX_TAGS) {
    // Delete the message
    await conn.deleteMessage(m.chat, m.key);

    // Kick the sender
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
  }
};

export default handler;
