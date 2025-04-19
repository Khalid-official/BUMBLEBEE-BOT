export default {
  name: "autodelete-jid",
  type: "before", // runs before main message processing
  async before(m, { conn }) {
    // === AUTO DELETE FOR SPECIFIC JIDs IN GROUPS IF BOT IS ADMIN ===
    const blockedJIDs = [
      "254785803178@s.whatsapp.net",
      "254783920842@s.whatsapp.net",
      "254101055319@s.whatsapp.net",
      "525537121258@s.whatsapp.net"
    ];

    // Check if message is from group and sender is in the blocked list
    if (m.isGroup && blockedJIDs.includes(m.sender)) {
      try {
        const groupMetadata = await conn.groupMetadata(m.chat);
        const botJid = conn.user.jid;
        const botParticipant = groupMetadata.participants.find(p => p.id === botJid);

        // Check if bot is admin
        if (botParticipant?.admin) {
          await conn.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: m.key.id,
              participant: m.sender
            }
          });
          console.log(`Auto-deleted message from ${m.sender} in group ${m.chat}`);
          return false; // prevent further processing
        }
      } catch (err) {
        console.error("Error checking group admin status or deleting message:", err);
      }
    }

    return true;
  }
};
