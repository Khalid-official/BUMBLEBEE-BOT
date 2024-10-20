export async function before(m, { conn, isAdmin, isBotAdmin }) {
    let chat = global.db.data.chats[m.chat]
    let delet = m.key.participant
    let bang = m.key.id
    let bot = global.db.data.settings[this.user.jid] || {}

    // If message is from the bot itself, ignore
    if (m.fromMe) return true;

    // Check for bot message IDs in both group and private chats
    if ((m.id.startsWith('3EB0') || m.id.startsWith('BAE5')) && m.id.length === 22) {

        // If in a group chat
        if (m.isGroup) {
            let chat = global.db.data.chats[m.chat];
            if (chat.antiBot && isBotAdmin) {
                // Delete bot message and remove the bot from the group
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        } 
        // If in a private chat
        else {
            // Delete bot message and block the bot
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
            await conn.updateBlockStatus(m.chat, 'block')
        }
    }
}
