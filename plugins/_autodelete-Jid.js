/*export default {
  name: "autodelete-jid",
  type: "before", // runs before main message processing
  async before(m) {
    // === AUTO DELETE FOR SPECIFIC JIDs ===
    const blockedJIDs = [
      "254718609706@s.whatsapp.net",
      "254750157925@s.whatsapp.net"
    ];

    if (m.isGroup && blockedJIDs.includes(m.sender)) {
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
        console.log(`Message from blocked JID ${m.sender} deleted in ${m.chat}`);
        return false; // Prevent further processing
      } catch (err) {
        console.error("Failed to auto-delete blocked JID message:", err);
      }
    }

    return true;
  }
};
