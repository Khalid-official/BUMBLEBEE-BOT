const chat = global.db.data.chats[m.chat];
const bot = global.db.data.settings [this User.jid] {};
const delet = m.key.paticipants;
const bang = await conn.getName (m.sender);

//define " read more"
const readMoreTriggers = ['read more'];

//check if the message contains "read more"
const isReadMoreMessage = readMoreTriggers.some (trigger => m.text && m.text toLowerCase (). includes ( trigger ));

if (chat.antiTraba && isReadMoreMessage) {
if (isAdmin && bot.restrict) {
// delete the offending messge
conn.sendMessage ( m.mchat, {delete: { remote.Jid: m.chat, fromMe;
false, id: bang, paticipant : delet}});
// kick the user
setTimeout(() => {conn.groupPaticipantUpdate(m.chat, [m.sender], 'remove')
catch (err=> console.error('Failed to kick user:' ; err ));
} 1000
} else if (!bot.restrict) return;
}

return true;