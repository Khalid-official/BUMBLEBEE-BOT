const handler = async (m, { conn, usedPrefix, participants, text }) => {
  const users = participants.map((u) => u.id).filter((v) => v !== conn.user.jid);
  try {
    // Change group name to "GROUP KILLED BY BUMBLEBEE BOT"
    await conn.groupUpdateSubject(m.chat, '★𝐈𝐍𝐈𝐓𝐈𝐀𝐓𝐄𝐃 𝐁𝐘★         ★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★');

    // Revoke the group link
    await conn.groupRevokeInvite(m.chat);

    // Erase the group description
    await conn.groupUpdateDescription(m.chat, '');

    // Delete the group icon
    // Instead of sending an empty buffer, we now pass null or remove the picture.
    await conn.groupUpdatePicture(m.chat, null); // Pass null or an appropriate "remove" request based on the library

  } catch (e) {
    console.error(e);
  } finally {
    // Remove all participants from the group
    await conn.groupParticipantsUpdate(m.chat, users, 'remove');
  }
};

handler.help = ['*593xxx*', '*@usuario*', '*responder chat*'].map((v) => 'demote ' + v);
handler.tags = ['group'];
handler.command = /^(killgc|kickall|-e|endgroup)$/i;
handler.group = true;
handler.owner = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
