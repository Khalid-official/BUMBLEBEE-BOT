const handler = async (m, {conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.png';
  const {antiToxic, antiTraba, antidelete, antiviewonce, isBanned, welcome, detect, detect2, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, modoadmin, audios, delete: del} = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const text = `*「 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎𝐍 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 」*\n
*𝐈𝐝𝐞𝐧𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐎𝐟 𝐓𝐡𝐞 𝐆𝐫𝐨𝐮𝐩:* 
${groupMetadata.id}

*𝐍𝐚𝐦𝐞:* 
${groupMetadata.subject}

*𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧:* 
${groupMetadata.desc?.toString() || '𝚂𝙸𝙽 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽'}

*𝐓𝐨𝐭𝐚𝐥 𝐏𝐚𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐬:*
${participants.length} 𝐏𝐚𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐬

*𝐂𝐫𝐞𝐚𝐭𝐨𝐫 𝐎𝐟 𝐓𝐡𝐞 𝐆𝐫𝐨𝐮𝐩:* 
@${owner.split('@')[0]}

*𝐀𝐝𝐦𝐢𝐧𝐬 𝐎𝐟 𝐓𝐡𝐞 𝐆𝐫𝐨𝐮𝐩:*
${listAdmin}

*𝐁𝐎𝐓 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐄:*
—◉ 𝚆𝙴𝙻𝙲𝙾𝙼𝙴: ${welcome ? '✅' : '❌'}
—◉ 𝙳𝙴𝚃𝙴𝙲𝚃: ${detect ? '✅' : '❌'} 
—◉ 𝙳𝙴𝚃𝙴𝙲𝚃 2: ${detect2 ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺: ${antiLink ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺 𝟸: ${antiLink2 ? '✅' : '❌'} 
—◉ 𝙼𝙾𝙳𝙾 𝙷𝙾𝚁𝙽𝚈: ${modohorny ? '✅' : '❌'} 
—◉ 𝙰𝚄𝚃𝙾𝚂𝚃𝙸𝙲𝙺𝙴𝚁: ${autosticker ? '✅' : '❌'} 
—◉ 𝙰𝚄𝙳𝙸𝙾𝚂: ${audios ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝚅𝙸𝙴𝚆𝙾𝙽𝙲𝙴: ${antiviewonce ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝙳𝙴𝙻𝙴𝚃𝙴: ${antidelete ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝚃𝙾𝚇𝙸𝙲: ${antiToxic ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝚃𝚁𝙰𝙱𝙰: ${antiTraba ? '✅' : '❌'} 
—◉ 𝙰𝙳𝙼𝙸𝙽𝙼𝙾𝙳𝐄: ${modoadmin ? '✅' : '❌'} 
`.trim();
  conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['infogrup'];
handler.tags = ['group'];
handler.command = /^(groupinfo|gro?upinfo|info(gro?up|gc))$/i;
handler.group = true;
export default handler;
