const handler = async (m, { conn }) => {
    const user = global.db.data.users[m.sender];
        conn.sendMessage(m.chat, {text: `https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗]  @${m.sender.split('@')[0]} now your resources are unlimited.*`, mentions: [m.sender]}, {quoted: m});
      global.db.data.users[m.sender].money = Infinity;
    global.db.data.users[m.sender].limit = Infinity;
  global.db.data.users[m.sender].level = Infinity;
 global.db.data.users[m.sender].exp = Infinity;
};
handler.help = ['cheat'];
handler.tags = ['owner'];
handler.command = /^(ilimitado|Infinity|chetar)$/i;
handler.rowner = true;
handler.fail = null;
export default handler;
