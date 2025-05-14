const handler = async (m) => {
  const totalreg = Object.keys(global.db.data.users).length;
  const rtotalreg = Object.values(global.db.data.users).filter((user) => user.msgs == true).length;
  m.reply(`https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗]The current number of database  🗃️ users is  ${totalreg} users*`);
};
handler.help = ['database', 'user'];
handler.tags = ['info'];
handler.command = /^(database|jumlahdatabase|user)$/i;
handler.limit = true;

export default handler;