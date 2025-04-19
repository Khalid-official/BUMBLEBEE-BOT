export default {
  name: "autodelete-jid",
  type: "before", // runs before main message processing
  async before(m) {
    // === AUTO DELETE FOR SPECIFIC JID ===
    const blockedJID = "254785803178@s.whatsapp.net";

    // Ensure it's a group message and from the blocked JID
    if (m.isGroup && m.sender === blockedJID) {
      let bang = m.key.id;
      let delet = m.key.participant || m.sender;

      try {
        await this.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: bang,
            participant: delet
          }
        });
        console.log(`Message from ${blockedJID} deleted in ${m.chat}`);
        return false; // Prevent further processing
      } catch (err) {
        console.error("Failed to auto-delete blocked JID message:", err);
      }
    }

    return true;
  }
};
